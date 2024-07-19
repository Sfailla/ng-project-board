import { Injectable } from '@angular/core'
import { ProjectService } from 'src/app/dashboard/pages/projects/project/project.service'
import { of } from 'rxjs/internal/observable/of'
import {
  mockCreateProjectResponseWithData,
  mockGetProjectByIdResponseWithData,
  mockProjectsResponseWithData,
  mockUpdateProjectResponseWithData
} from '../data/project-service.mock'

@Injectable()
export class ProjectServiceMock extends ProjectService {
  constructor() {
    super()
  }

  override getProjectsQuery() {
    return of(mockProjectsResponseWithData)
  }

  override getProjectByIdQuery() {
    return of(mockGetProjectByIdResponseWithData)
  }

  override createProjectMutation() {
    return of(mockCreateProjectResponseWithData)
  }

  override updateProjectMutation() {
    return of(mockUpdateProjectResponseWithData)
  }
}
