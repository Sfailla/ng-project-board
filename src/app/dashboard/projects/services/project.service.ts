import { Injectable, inject } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { GetProjectsDocument } from '../../../../generated/queries/index.graphql-gen'
import { map } from 'rxjs/internal/operators/map'
import { Project } from '../../../../generated/types.graphql-gen'
import { LocalStorageService } from '../../../shared/services'

@Injectable({ providedIn: 'root' })
export class ProjectService {
  apollo: Apollo = inject(Apollo)
  storageService: LocalStorageService = inject(LocalStorageService)

  setProjectId(projectId: string): void {
    this.storageService.setItem('project-id', projectId)
  }

  getProjects() {
    return this.apollo
      .query<{
        getProjects: Project[]
      }>({ query: GetProjectsDocument })
      .pipe(
        map(({ data, errors }) => {
          console.log({ data, errors })

          if (errors) {
            console.log('Error fetching projects', errors)
          }

          return data?.getProjects || []
        })
      )
  }
}
