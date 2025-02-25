import { TestBed } from '@angular/core/testing'

import { TaskService } from './task.service'
import { Apollo } from 'apollo-angular'
import { ToastService } from '@shared/services'

describe('TaskService', () => {
  let service: TaskService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Apollo, ToastService]
    })
    service = TestBed.inject(TaskService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
