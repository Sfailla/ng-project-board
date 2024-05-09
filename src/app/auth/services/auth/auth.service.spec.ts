import { TestBed } from '@angular/core/testing'
import { AuthService } from './auth.service'
import { Apollo } from 'apollo-angular'
import { ToastService } from '@shared/services'
import { provideRouter } from '@angular/router'
import { DashboardComponent } from '../../../dashboard/dashboard.component'
import { LoginComponent } from '../../components'
import { ErrorMessages, Messages, Routes } from '@shared/types'
import { lastValueFrom } from 'rxjs/internal/lastValueFrom'
import { of } from 'rxjs/internal/observable/of'
import {
  getAuthUserInput,
  mockLoginResponseWithData,
  mockLoginResponseWithError,
  mockLogoutResponseWithData,
  mockRegisterResponseWithData,
  mockRegisterResponseWithError
} from '@testing/mocks/data'

const mockApolloClient = { client: { resetStore: jest.fn() } }

describe('AuthService', () => {
  let service: AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'dashboard', component: DashboardComponent },
          { path: 'auth/login', component: LoginComponent }
        ]),
        { provide: ToastService, useValue: { present: jest.fn() } },
        { provide: Apollo, useValue: mockApolloClient }
      ]
    })

    service = TestBed.inject(AuthService)

    service.logCurrentUser = jest.fn(() => null)
  })

  afterEach(() => jest.clearAllMocks())

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('loginMutation() fn should work as expected', done => {
    const authInput = getAuthUserInput()

    jest.spyOn(service, 'loginMutation').mockReturnValue(of(mockLoginResponseWithData))

    service.loginMutation(authInput).subscribe(data => {
      expect(data).toEqual(mockLoginResponseWithData)
      done()
    })

    expect(service.loginMutation).toHaveBeenCalledTimes(1)
    expect(service.loginMutation).toHaveBeenCalledWith(authInput)
  })

  it('login() fn should call mutation with correct args', done => {
    const authInput = getAuthUserInput()

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
    const authInput = getAuthUserInput()

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
    const authInput = getAuthUserInput()

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
    const authInput = getAuthUserInput()

    jest.spyOn(service, 'loginMutation').mockReturnValue(of(mockLoginResponseWithData))
    jest.spyOn(service.apollo.client, 'resetStore')

    service.login(authInput).subscribe()

    expect(service.apollo.client.resetStore).toHaveBeenCalledTimes(1)

    done()
  })

  it('should set currentUser signal after successful login', done => {
    const authInput = getAuthUserInput()

    jest.spyOn(service, 'loginMutation').mockReturnValue(of(mockLoginResponseWithData))

    service.login(authInput).subscribe()

    expect(service.currentUser()).toEqual(mockLoginResponseWithData.data.login.user)

    done()
  })

  it('should navigate to dashboard after successful login', async () => {
    const authInput = getAuthUserInput()

    jest.spyOn(service.navController, 'navigateRoot')

    jest.spyOn(service, 'loginMutation').mockReturnValue(of(mockLoginResponseWithData))

    await lastValueFrom(service.login(authInput))

    expect(service.navController.navigateRoot).toHaveBeenCalledTimes(1)
    expect(service.navController.navigateRoot).toHaveBeenCalledWith([Routes.DASHBOARD], {
      animationDirection: 'forward'
    })
  })

  it('registerMutation() fn should work as expected', done => {
    const authInput = getAuthUserInput({ type: 'register' })

    jest.spyOn(service, 'registerMutation').mockReturnValue(of(mockRegisterResponseWithData))

    service.registerMutation(authInput).subscribe(data => {
      expect(data).toEqual(mockRegisterResponseWithData)
      done()
    })

    expect(service.registerMutation).toHaveBeenCalledTimes(1)
    expect(service.registerMutation).toHaveBeenCalledWith(authInput)
  })

  it('register() fn should call mutation with correct args', done => {
    const authInput = getAuthUserInput({ type: 'register' })

    jest.spyOn(service, 'register')
    jest.spyOn(service, 'registerMutation').mockReturnValue(of(mockRegisterResponseWithData))

    service.register(authInput).subscribe()

    expect(service.registerMutation).toHaveBeenCalledTimes(1)
    expect(service.registerMutation).toHaveBeenCalledWith(authInput)

    expect(service.register).toHaveBeenCalledTimes(1)
    expect(service.register).toHaveBeenCalledWith(authInput)

    done()
  })

  it('should set currentUser signal after successful registration', done => {
    const authInput = getAuthUserInput({ type: 'register' })

    jest.spyOn(service, 'registerMutation').mockReturnValue(of(mockRegisterResponseWithData))

    service.register(authInput).subscribe()

    expect(service.currentUser()).toEqual(mockRegisterResponseWithData.data.createUser.user)

    done()
  })

  it('successful register() fn should call toast with correct args', done => {
    const authInput = getAuthUserInput({ type: 'register' })

    jest.spyOn(service.toastService, 'present')
    jest.spyOn(service, 'registerMutation').mockReturnValue(of(mockRegisterResponseWithData))

    service.register(authInput).subscribe()

    expect(service.toastService.present).toHaveBeenCalledTimes(1)
    expect(service.toastService.present).toHaveBeenCalledWith({
      variant: 'success',
      message: Messages.REGISTRATION_SUCCESSFUL
    })

    done()
  })

  it('failed register() fn should call toast with correct args', done => {
    const authInput = getAuthUserInput({ type: 'register' })

    jest.spyOn(service.toastService, 'present')
    jest.spyOn(service, 'registerMutation').mockReturnValue(of(mockRegisterResponseWithError))

    service.register(authInput).subscribe()

    expect(service.toastService.present).toHaveBeenCalledTimes(1)
    expect(service.toastService.present).toHaveBeenCalledWith({
      variant: 'error',
      message: ErrorMessages.REGISTRATION_FAILED
    })

    done()
  })

  it('should call toast if passwords do not match', done => {
    const authInput = getAuthUserInput({
      type: 'register',
      updateKey: { confirmPassword: '12345' }
    })

    jest.spyOn(service.toastService, 'present')

    service.register(authInput).subscribe()

    expect(service.toastService.present).toHaveBeenCalledTimes(1)
    expect(service.toastService.present).toHaveBeenCalledWith({
      variant: 'error',
      message: ErrorMessages.PASSWORDS_DO_NOT_MATCH
    })

    done()
  })

  it('successful register() fn should call resetStore', done => {
    const authInput = getAuthUserInput({ type: 'register' })

    jest.spyOn(service, 'registerMutation').mockReturnValue(of(mockRegisterResponseWithData))
    jest.spyOn(service.apollo.client, 'resetStore')

    service.register(authInput).subscribe()

    expect(service.apollo.client.resetStore).toHaveBeenCalledTimes(1)

    done()
  })

  it('should navigate to dashboard after successful registration', async () => {
    const authInput = getAuthUserInput({ type: 'register' })

    jest.spyOn(service.navController, 'navigateRoot')
    jest.spyOn(service, 'registerMutation').mockReturnValue(of(mockRegisterResponseWithData))

    await lastValueFrom(service.register(authInput))

    expect(service.navController.navigateRoot).toHaveBeenCalledTimes(1)
    expect(service.navController.navigateRoot).toHaveBeenCalledWith([Routes.DASHBOARD], {
      animationDirection: 'forward'
    })
  })

  it('logoutMutat() fn should work as expected', done => {
    jest.spyOn(service, 'logoutQuery').mockReturnValue(of(mockLogoutResponseWithData))

    service.logout().subscribe()

    expect(service.logoutQuery).toHaveBeenCalledTimes(1)

    done()
  })

  it('logout() fn should work as expected', done => {
    jest.spyOn(service, 'logout')
    jest.spyOn(service, 'logoutQuery').mockReturnValue(of(mockLogoutResponseWithData))

    service.logout().subscribe()

    expect(service.logout).toHaveBeenCalledTimes(1)
    expect(service.logoutQuery).toHaveBeenCalledTimes(1)

    done()
  })
})
