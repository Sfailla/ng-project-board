import { Injectable, inject } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { LocalStorageService, ToastService } from '@shared/services'
import { LocalStorageKeys, Messages, Routes, ToastType } from '@shared/types'
import { NavController } from '@ionic/angular'
import { ProjectInput } from '@generated/types'
import { ApolloCache, DocumentNode, FetchResult } from '@apollo/client'
import { map } from 'rxjs/internal/operators/map'
import {
  GetProjectByIdDocument,
  GetProjectByIdQuery,
  GetProjectsDocument,
  GetProjectsQuery
} from '@generated/queries'
import {
  CreateProjectDocument,
  CreateProjectMutation,
  DeleteProjectDocument,
  DeleteProjectMutation,
  UpdateProjectDocument,
  UpdateProjectMutation
} from '@generated/mutations'

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

  removeProjectId(projectId: string): void {
    const currProjectId = this.getProjectId()
    if (currProjectId !== projectId) return

    this.storageService.removeItem(LocalStorageKeys.PROJECT_ID)
    this.navController.navigateBack(Routes.HOME)
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

  getProjectByIdQuery(projectId: string) {
    return this.apollo.query<GetProjectByIdQuery>({
      query: GetProjectByIdDocument,
      errorPolicy: 'all',
      variables: { projectId }
    })
  }

  getProjectById(projectId: string) {
    return this.getProjectByIdQuery(projectId).pipe(
      map(({ data: { getProjectById }, errors }) => {
        if (errors)
          this.toastService.present({ variant: ToastType.ERROR, message: errors[0].message })
        if (getProjectById) return getProjectById
        return null
      })
    )
  }

  createProjectCacheUpdate<T extends GetProjectsQuery, D extends CreateProjectMutation>() {
    return (store: ApolloCache<T>, storeData: T, data: D) => {
      const { getProjects } = storeData

      store.writeQuery<GetProjectsQuery>({
        query: GetProjectsDocument,
        data: { getProjects: [...getProjects, data.createProject] }
      })
    }
  }

  createProjectMutation(name: string, description: string) {
    return this.apollo.mutate<CreateProjectMutation>({
      mutation: CreateProjectDocument,
      errorPolicy: 'all',
      variables: { name, description },
      update: this.updateApolloCache<GetProjectsQuery, CreateProjectMutation>(
        GetProjectsDocument,
        this.createProjectCacheUpdate()
      )
    })
  }

  createProject(name: string, description: string) {
    return this.createProjectMutation(name, description).pipe(
      map(async ({ data, errors }) => {
        if (errors)
          this.toastService.present({ variant: ToastType.ERROR, message: errors[0].message })
        if (data) {
          await this.navController.navigateBack(Routes.HOME)
        }
      })
    )
  }

  updateProjectMutation(projectInput: ProjectInput) {
    return this.apollo.mutate<UpdateProjectMutation>({
      mutation: UpdateProjectDocument,
      errorPolicy: 'all',
      variables: { input: projectInput }
    })
  }

  updateProject(projectInput: ProjectInput) {
    return this.updateProjectMutation(projectInput).pipe(
      map(({ data, errors }) => {
        if (errors)
          this.toastService.present({ variant: ToastType.ERROR, message: errors[0].message })

        if (data) {
          this.toastService.present({
            variant: ToastType.SUCCESS,
            message: Messages.PROJECT_UPDATED
          })

          return data.updateProject
        }

        return null
      })
    )
  }

  deleteProjectCacheUpdate<T extends GetProjectsQuery>(projectId: string) {
    return (store: ApolloCache<T>, storeData: T) => {
      const { getProjects } = storeData
      const updatedProjects = getProjects.filter(project => project.id !== projectId)

      store.writeQuery<GetProjectsQuery>({
        query: GetProjectsDocument,
        data: { getProjects: updatedProjects }
      })

      this.removeProjectId(projectId)
    }
  }

  deleteProjectMutation(projectId: string) {
    return this.apollo.mutate<DeleteProjectMutation>({
      mutation: DeleteProjectDocument,
      errorPolicy: 'all',
      variables: { deleteProjectId: projectId },
      update: this.updateApolloCache<GetProjectsQuery, DeleteProjectMutation>(
        GetProjectsDocument,
        this.deleteProjectCacheUpdate(projectId)
      )
    })
  }

  deleteProject(projectId: string) {
    return this.deleteProjectMutation(projectId).pipe(
      map(({ data, errors }) => {
        if (errors)
          this.toastService.present({ variant: ToastType.ERROR, message: errors[0].message })
        if (data?.deleteProject)
          this.toastService.present({
            variant: ToastType.SUCCESS,
            message: Messages.PROJECT_DELETED
          })
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
