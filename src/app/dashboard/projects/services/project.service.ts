import { Injectable, inject } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { map } from 'rxjs/internal/operators/map'
import { LocalStorageService } from '../../../shared/services'
import { LocalStorageKeys } from '../../../shared-types'
import {
  GetProjectsDocument,
  GetProjectsQuery
} from '../../../../generated/queries/index.graphql-gen'
import {
  CreateProjectDocument,
  CreateProjectMutation
} from '../../../../generated/mutations/index.graphql-gen'

@Injectable({ providedIn: 'root' })
export class ProjectService {
  apollo: Apollo = inject(Apollo)
  storageService: LocalStorageService = inject(LocalStorageService)

  setProjectId(projectId: string): void {
    this.storageService.setItem(LocalStorageKeys.PROJECT_ID, projectId)
  }

  getProjectId(): string | null {
    return this.storageService.getItem(LocalStorageKeys.PROJECT_ID)
  }

  getProjects() {
    return this.apollo.query<GetProjectsQuery>({ query: GetProjectsDocument }).pipe(
      map(({ data, errors }) => {
        if (errors) console.log('Error fetching projects', errors)
        if (data) return data.getProjects
        return null
      })
    )
  }

  createProject() {
    return this.apollo.mutate<CreateProjectMutation>({ mutation: CreateProjectDocument }).pipe(
      map(({ data, errors }) => {
        if (errors) console.log('Error creating project', errors)
        if (data) return data.createProject
        return null
      })
    )
  }
}
