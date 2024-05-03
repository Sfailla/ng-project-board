import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AuthComponent } from './auth.component'
import { AuthService } from '@auth/services'
import { provideRouter } from '@angular/router'
import { MockAuthService } from '@testing/mocks/services'
import { AuthTitles } from '../../auth-types'
import { findNativeElement, getNativeElementText } from '@testing/utils'
import { Apollo } from 'apollo-angular'
import { Location } from '@angular/common'
import { RegisterComponent } from '../register/register.component'
import { LoginComponent } from '../login/login.component'

function createComponent({ setInput = AuthTitles.LOGIN } = {}) {
  const fixture: ComponentFixture<AuthComponent> = TestBed.createComponent(AuthComponent)
  const component: AuthComponent = fixture.componentInstance
  const location = TestBed.inject(Location)

  fixture.componentRef.setInput('title', setInput)
  fixture.detectChanges()

  return { fixture, component, location }
}

describe('AuthComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [
        provideRouter([
          { path: 'auth/login', component: LoginComponent },
          { path: 'auth/register', component: RegisterComponent }
        ]),
        { provide: Apollo, useValue: {} },
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents()
  })

  it('should create', () => {
    const { component } = createComponent()
    expect(component).toBeTruthy()
  })

  it('should have a login title if isLogin() === true', () => {
    const { fixture } = createComponent()
    const title = getNativeElementText(fixture, '.card__title--text')

    expect(title).toMatch(/sign into/gi)
  })

  it('should have a register title if isLogin() === false', () => {
    const { fixture } = createComponent({ setInput: AuthTitles.REGISTER })
    const title = getNativeElementText(fixture, '.card__title--text')

    expect(title).toMatch(/sign up for/gi)
  })

  it('should have a sign up link message if isLogin() === true', () => {
    const { fixture } = createComponent()
    const link = getNativeElementText(fixture, '.card__subtitle--text')

    expect(link).toMatch(/sign up for an account/gi)
  })

  it('should have a sign in link message if isLogin() === false', () => {
    const { fixture } = createComponent({ setInput: AuthTitles.REGISTER })
    const link = getNativeElementText(fixture, '.card__subtitle--text')

    expect(link).toMatch(/already have an account?/gi)
  })

  it('should have a sign up redirect link if isLogin() === true', () => {
    const { fixture } = createComponent()
    const link = getNativeElementText(fixture, 'a')

    expect(link).toMatch(/sign up/gi)
  })

  it('should have a sign in redirect link if isLogin() === false', () => {
    const { fixture } = createComponent({ setInput: AuthTitles.REGISTER })
    const link = getNativeElementText(fixture, 'a')

    expect(link).toMatch(/sign in/gi)
  })

  it('should call correct router path for sign up link', async () => {
    const { fixture, location } = createComponent()
    const routerLink = findNativeElement(fixture, 'a')

    routerLink.click()

    expect(location.path()).toBe('/auth/register')
  })

  it('should call correct router path for sign in link', async () => {
    const { fixture, location } = createComponent({ setInput: AuthTitles.REGISTER })
    const routerLink = findNativeElement(fixture, 'a')

    routerLink.click()

    expect(location.path()).toBe('/auth/login')
  })
})
