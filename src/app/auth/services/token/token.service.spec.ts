import { TestBed } from '@angular/core/testing'

import { TokenService } from './token.service'
import { Apollo } from 'apollo-angular'
import { LocalStorageService, ToastService } from '@shared/services'
import { LocalStorageServiceMock } from '@testing/mocks/services'
import { baseAuthenticatedResponse, mockToken, mockUser } from '@testing/mocks/data'

describe('TokenService', () => {
  let service: TokenService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Apollo,
        ToastService,
        { provide: LocalStorageService, useClass: LocalStorageServiceMock }
      ]
    })
    service = TestBed.inject(TokenService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should save token', () => {
    service.saveToken(mockToken)
    expect(service.getToken()).toBe(mockToken)
  })

  it('should save user', () => {
    service.saveUser(mockUser)
    expect(service.getUser()).toEqual(mockUser)
  })

  it('should save user and token', async () => {
    await service.saveUserAndToken(baseAuthenticatedResponse)

    expect(service.getUser()).toEqual(mockUser)
    expect(service.getToken()).toBe(mockToken)
  })

  it('should get token', () => {
    service.saveToken(mockToken)
    expect(service.getToken()).toBe(mockToken)
  })

  it('should get user', () => {
    service.saveUser(mockUser)
    expect(service.getUser()).toEqual(mockUser)
  })

  it('should destroy session', () => {
    service.saveUser(mockUser)
    service.saveToken(mockToken)

    service.destroySession()

    expect(service.getUser()).toBeNull()
    expect(service.getToken()).toBeNull()
  })
})
