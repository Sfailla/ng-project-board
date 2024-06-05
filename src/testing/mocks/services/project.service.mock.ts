import { Injectable } from '@angular/core'
import { ProjectService } from '@shared/services'
import { of } from 'rxjs/internal/observable/of'
import { mockProjectsResponseWithData } from '../data/project-service.mock'

@Injectable()
export class ProjectServiceMock extends ProjectService {
  constructor() {
    super()
  }

  override getProjectsQuery() {
    return of(mockProjectsResponseWithData)
  }

  override getProjectId() {
    return null
  }
}
