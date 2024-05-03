import { TestBed } from '@angular/core/testing'
import { AuthService } from './auth.service'
import { Apollo } from 'apollo-angular'
import { ToastService } from '@shared/services'
import { of } from 'rxjs/internal/observable/of'

const mockLoginMutationResponse = {
  data: {
    login: {
      user: {
        id: 'e8eca0f6-8214-47b0-b35c-92d3587956f5',
        firstname: 'Steven',
        lastname: 'Failla',
        fullname: 'Steven Failla',
        username: 'sfailla',
        email: 'sfailla1983@gmail.com',
        password: '$2a$10$y9gyAzXOVU77vvHebmqZAef7zOc7/8kRCEB/p3UepMxTOHSbXbmSy',
        company: null,
        position: null,
        avatar: null,
        createdAt: '2024-04-10T00:09:44.253Z',
        updatedAt: '2024-04-10T00:09:44.253Z'
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLXNlcnZpY2UiLCJhdWQiOiJjbGllbnQtc2VydmljZSIsInVzZXIiOnsiaWQiOiJlOGVjYTBmNi04MjE0LTQ3YjAtYjM1Yy05MmQzNTg3OTU2ZjUiLCJ1c2VybmFtZSI6InNmYWlsbGEiLCJlbWFpbCI6InNmYWlsbGExOTgzQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MTQzMzkwNDksImV4cCI6MTcxNDk0Mzg0OX0.D0QT1Bv0xI7jEwhe9EUxsf5u5w7AaSzTVQ2imk1vwLs'
    }
  },
  errors: [],
  loading: false
}

const authInput = { email: 'sfailla@gmail.com', password: '1234' }

describe('AuthService', () => {
  let service: AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Apollo, ToastService]
    })

    service = TestBed.inject(AuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('loginMutation() fn should work as expected', done => {
    jest.spyOn(service, 'loginMutation').mockReturnValue(of(mockLoginMutationResponse))

    service.loginMutation(authInput).subscribe(data => {
      expect(data).toEqual(mockLoginMutationResponse)
      done()
    })

    expect(service.loginMutation).toHaveBeenCalledTimes(1)
    expect(service.loginMutation).toHaveBeenCalledWith(authInput)
  })
})
