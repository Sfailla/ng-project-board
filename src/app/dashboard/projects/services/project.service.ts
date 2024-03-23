import { Injectable, inject } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { map } from 'rxjs/internal/operators/map'
import { LocalStorageService, ToastService } from '@shared/services'
import { LocalStorageKeys, ToastType } from '@shared/types'
import { GetProjectsDocument, GetProjectsQuery } from '@generated/queries'
import {
  CreateProjectDocument,
  CreateProjectMutation,
  DeleteProjectDocument,
  DeleteProjectMutation
} from '@generated/mutations'
import { NavController } from '@ionic/angular'
import { ApolloCache, DocumentNode, FetchResult } from '@apollo/client'

@Injectable({ providedIn: 'root' })
export class ProjectService {
  apollo: Apollo = inject(Apollo)
  navController: NavController = inject(NavController)
  storageService: LocalStorageService = inject(LocalStorageService)
  toastService: ToastService = inject(ToastService)

  ToastType: typeof ToastType = ToastType

  setProjectId(projectId: string): void {
    this.storageService.setItem(LocalStorageKeys.PROJECT_ID, projectId)
  }

  getProjectId(): string | null {
    return this.storageService.getItem(LocalStorageKeys.PROJECT_ID)
  }

  removeProjectId(projectId: string) {
    const currProjectId = this.storageService.getItem(LocalStorageKeys.PROJECT_ID)
    if (currProjectId === projectId) this.storageService.removeItem(LocalStorageKeys.PROJECT_ID)
  }

  getProjectsQuery() {
    return this.apollo.watchQuery<GetProjectsQuery>({
      query: GetProjectsDocument,
      errorPolicy: 'all'
    }).valueChanges
  }

  getProjects() {
    return this.getProjectsQuery().pipe(
      map(({ data: { getProjects }, errors }) => {
        if (errors)
          this.toastService.present({ variant: ToastType.ERROR, message: errors[0].message })
        if (getProjects) return getProjects
        return null
      })
    )
  }

  createProjectMutation(name: string, description: string) {
    return this.apollo.mutate<CreateProjectMutation>({
      mutation: CreateProjectDocument,
      errorPolicy: 'all',
      variables: { name, description },
      update: this.updateApolloCache(GetProjectsDocument, (store, storeData, data) => {
        const { getProjects } = storeData
        store.writeQuery<GetProjectsQuery>({
          query: GetProjectsDocument,
          data: { getProjects: [...getProjects, data.createProject] }
        })
      })
    })
  }

  createProject(name: string, description: string) {
    return this.createProjectMutation(name, description).pipe(
      map(async ({ data, errors }) => {
        if (errors)
          this.toastService.present({ variant: ToastType.ERROR, message: errors[0].message })
        if (data) {
          await this.navController.navigateBack('/dashboard/home')
          return data.createProject
        }
        return null
      })
    )
  }

  deleteProjectMutation(projectId: string) {
    return this.apollo.mutate<DeleteProjectMutation>({
      mutation: DeleteProjectDocument,
      errorPolicy: 'all',
      variables: { deleteProjectId: projectId },
      update: this.updateApolloCache<GetProjectsQuery, DeleteProjectMutation>(
        GetProjectsDocument,
        (store, storeData) => {
          const { getProjects } = storeData
          const updatedProjects = getProjects.filter(project => project.id !== projectId)
          store.writeQuery<GetProjectsQuery>({
            query: GetProjectsDocument,
            data: { getProjects: updatedProjects }
          })

          this.removeProjectId(projectId)
        }
      )
    })
  }

  deleteProject(projectId: string) {
    return this.deleteProjectMutation(projectId).pipe(
      map(({ data, errors }) => {
        if (errors)
          this.toastService.present({ variant: ToastType.ERROR, message: errors[0].message })
        if (data) return data.deleteProject
        return null
      })
    )
  }

  updateApolloCache<T, D>(
    query: DocumentNode,
    writeQueryData: (store: ApolloCache<T>, storeData: T, data: D) => void
  ) {
    return (store: ApolloCache<T>, { data }: FetchResult<D>) => {
      const storeData = store.readQuery<T>({ query })

      if (storeData && data) {
        writeQueryData(store, storeData, data)
      }
    }
  }
}
