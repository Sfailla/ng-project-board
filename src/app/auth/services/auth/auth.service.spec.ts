import { TestBed } from '@angular/core/testing'
import { AuthService } from './auth.service'
import { Apollo } from 'apollo-angular'
import { ToastService } from '@shared/services'
import { of } from 'rxjs/internal/observable/of'
import { baseAuthenticatedResponse, withData, withErrors } from '@testing/mocks/data'
import { provideRouter } from '@angular/router'
import { DashboardComponent } from '../../../dashboard/dashboard.component'
import { ErrorMessages, Messages } from '@shared/types'
import { GraphQLError } from 'graphql'

const mockLoginResponseWithData = withData({
  login: baseAuthenticatedResponse
})

const mockLoginResponseWithError = withErrors(<GraphQLError[]>[
  { message: ErrorMessages.LOGIN_FAILED }
])

const mockApolloClient = { client: { resetStore: jest.fn() } }

describe('AuthService', () => {
  let service: AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'dashboard', component: DashboardComponent }]),
        { provide: ToastService, useValue: { present: jest.fn() } },
        { provide: Apollo, useValue: mockApolloClient }
      ]
    })

    service = TestBed.inject(AuthService)
  })

  afterEach(() => jest.clearAllMocks())

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('loginMutation() fn should work as expected', done => {
    const authInput = { email: 'sfailla@gmail.com', password: '1234' }

    jest.spyOn(service, 'loginMutation').mockReturnValue(of(mockLoginResponseWithData))

    service.loginMutation(authInput).subscribe(data => {
      expect(data).toEqual(mockLoginResponseWithData)
      done()
    })

    expect(service.loginMutation).toHaveBeenCalledTimes(1)
    expect(service.loginMutation).toHaveBeenCalledWith(authInput)
  })

  it('login() fn should call mutation with correct args', done => {
    const authInput = { email: 'sfailla@gmail.com', password: '1234' }

    jest.spyOn(service, 'login')
    jest.spyOn(service, 'loginMutation').mockReturnValue(of(mockLoginResponseWithData))

    service.login(authInput).subscribe()

    expect(service.loginMutation).toHaveBeenCalledTimes(1)
    expect(service.loginMutation).toHaveBeenCalledWith(authInput)

    expect(service.login).toHaveBeenCalledTimes(1)
    expect(service.login).toHaveBeenCalledWith(authInput)

    done()
  })

  it('successful login() fn should call toast with correct args', done => {
    const authInput = { email: 'sfailla@gmail.com', password: '1234' }

    jest.spyOn(service.toastService, 'present')
    jest.spyOn(service, 'loginMutation').mockReturnValue(of(mockLoginResponseWithData))

    service.login(authInput).subscribe()

    expect(service.toastService.present).toHaveBeenCalledTimes(1)
    expect(service.toastService.present).toHaveBeenCalledWith({
      variant: 'success',
      message: Messages.LOGIN_SUCCESSFUL
    })

    done()
  })

  it('failed login() fn should call toast with correct args', done => {
    const authInput = { email: 'sfailla@gmail.com', password: '1234' }

    jest.spyOn(service.toastService, 'present')
    jest.spyOn(service, 'loginMutation').mockReturnValue(of(mockLoginResponseWithError))

    service.login(authInput).subscribe()

    expect(service.toastService.present).toHaveBeenCalledTimes(1)
    expect(service.toastService.present).toHaveBeenCalledWith({
      variant: 'error',
      message: ErrorMessages.LOGIN_FAILED
    })

    done()
  })

  it('successful login() fn should call resetStore', done => {
    const authInput = { email: 'sfailla1983@gmail.com', password: '1234' }

    jest.spyOn(service, 'loginMutation').mockReturnValue(of(mockLoginResponseWithData))
    jest.spyOn(service.apollo.client, 'resetStore')

    service.login(authInput).subscribe()

    expect(service.apollo.client.resetStore).toHaveBeenCalledTimes(1)

    done()
  })

  it('should set currentUser signal after successful login', done => {
    const authInput = { email: 'sfailla1983@gmail.com', password: '1234' }

    jest.spyOn(service, 'loginMutation').mockReturnValue(of(mockLoginResponseWithData))

    service.login(authInput).subscribe()

    expect(service.currentUser()).toEqual(mockLoginResponseWithData.data.login.user)

    done()
  })
})
