import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { AuthService } from './auth/services'
import { provideRouter } from '@angular/router'
import { AuthServiceMock } from '@testing/mocks/services'
import { Apollo } from 'apollo-angular'
import { AUTH_ROUTES } from './auth/auth.routes'
import { setupTest } from '../testing/utils'

function createAppComponent() {
  const { fixture, component } = setupTest(AppComponent)
  return { fixture, component }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(AUTH_ROUTES),
        { provide: Apollo, useValue: {} },
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    }).compileComponents()
  })

  it('should create the app', () => {
    const { component } = createAppComponent()
    expect(component).toBeTruthy()
  })

  it('should call setCurrentUserIfAuthenticated onInit', () => {
    const { component } = createAppComponent()

    const spy = jest.spyOn(component, 'setCurrentUserIfAuthenticated')
    component.ngOnInit()
    expect(spy).toHaveBeenCalled()
  })

  it('should call setCurrentUser if authenticated', () => {
    const { component } = createAppComponent()

    jest.spyOn(component.authService, 'isAuthenticated').mockReturnValue(true)
    jest.spyOn(component.authService, 'setCurrentUser')

    component.setCurrentUserIfAuthenticated()
    expect(component.authService.setCurrentUser).toHaveBeenCalled()
  })

  it('should not call setCurrentUser if not authenticated', () => {
    const { component } = createAppComponent()

    jest.spyOn(component.authService, 'isAuthenticated').mockReturnValue(false)
    jest.spyOn(component.authService, 'setCurrentUser')

    component.setCurrentUserIfAuthenticated()
    expect(component.authService.setCurrentUser).not.toHaveBeenCalled()
  })
})
