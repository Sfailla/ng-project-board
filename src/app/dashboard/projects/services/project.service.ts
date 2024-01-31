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
      .watchQuery<{ getProjects: Project[] }>({ query: GetProjectsDocument })
      .valueChanges.pipe(map(({ data }) => data.getProjects))
  }
}
