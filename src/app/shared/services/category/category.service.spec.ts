import { TestBed } from '@angular/core/testing'

import { CategoryService } from './category.service'
import { Apollo } from 'apollo-angular'
import { ToastService } from '../toast/toast.service'

describe('CategoryService', () => {
  let service: CategoryService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Apollo, ToastService]
    })
    service = TestBed.inject(CategoryService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
