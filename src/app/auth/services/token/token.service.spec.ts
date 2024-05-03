import { TestBed } from '@angular/core/testing'

import { TokenService } from './token.service'
import { Apollo } from 'apollo-angular'
import { ToastService } from '@shared/services'

describe('TokenService', () => {
  let service: TokenService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Apollo, ToastService]
    })
    service = TestBed.inject(TokenService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
