import { TestBed } from '@angular/core/testing'

import { ProjectService } from './project.service'
import { Apollo } from 'apollo-angular'
import { ToastService } from '../toast/toast.service'

describe('ProjectService', () => {
  let service: ProjectService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Apollo, ToastService]
    })
    service = TestBed.inject(ProjectService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
