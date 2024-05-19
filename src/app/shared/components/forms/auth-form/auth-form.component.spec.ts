import { TestBed } from '@angular/core/testing'
import { AuthFormComponent } from './auth-form.component'
import { AuthService } from '@auth/services'
import { AuthServiceMock } from '@testing/mocks/services'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { findAllNativeElements, findNativeElement, setupTest } from '@testing/utils'
import { Apollo } from 'apollo-angular'
import { NavController } from '@ionic/angular'

const form = new FormGroup({
  username: new FormControl('', Validators.min(4)),
  email: new FormControl('', [Validators.email, Validators.required]),
  password: new FormControl('', [Validators.required, Validators.min(4)]),
  confirmPassword: new FormControl('', Validators.min(4))
})

function createComponent({ setInput = { isLogin: true, form } } = {}) {
  const { fixture, component } = setupTest(AuthFormComponent, { setInput })
  return { fixture, component }
}

describe('AuthFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormComponent],
      providers: [
        {
          provide: Apollo,
          useValue: { client: { resetStore: jest.fn() } }
        },
        {
          provide: NavController,
          useValue: { navigateRoot: jest.fn() }
        },
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    }).compileComponents()
  })

  it('should create AuthFormComponent', () => {
    const { component } = createComponent()
    expect(component).toBeTruthy()
  })

  it('should only have email and password field if isLogin === true', () => {
    const { fixture } = createComponent()
    const inputs = findAllNativeElements(fixture, 'ion-input')

    expect(inputs.length).toBe(2)
  })

  it('should have username | confirm-password fields if isLogin === false', () => {
    const { fixture } = createComponent({ setInput: { isLogin: false, form } })
    const inputs = findAllNativeElements(fixture, 'ion-input')

    expect(inputs.length).toBe(4)
  })

  it('submit button should be disabled, then enabled when inputs are filled out', async () => {
    const { component, fixture } = createComponent()
    const form = findNativeElement(fixture, 'form')
    const email = component.form().get('email')
    const password = component.form().get('password')
    const submitButton = findNativeElement(fixture, 'ion-button')

    expect(submitButton.disabled).toBe(true)

    email?.setValue('sfailla@gmail.com')
    password?.setValue('1234')

    form.dispatchEvent(new Event('submit'))
    fixture.detectChanges()

    expect(submitButton.disabled).toBe(false)
  })

  it('should call submit() fn when form is submitted', async () => {
    const { component, fixture } = createComponent()
    const form = findNativeElement(fixture, 'form')
    const email = component.form().get('email')
    const password = component.form().get('password')

    jest.spyOn(component, 'submit')

    email?.setValue('sfailla@gmail.com')
    password?.setValue('1234')

    form.dispatchEvent(new Event('submit'))
    fixture.detectChanges()

    expect(component.submit).toHaveBeenCalledTimes(1)
  })

  it('should call authService.login() when isLogin === true', async () => {
    const { component, fixture } = createComponent()
    const form = findNativeElement(fixture, 'form')
    const email = component.form().get('email')
    const password = component.form().get('password')

    jest.spyOn(component.authService, 'login')
    jest.spyOn(component.authService, 'register')

    email?.setValue('sfailla')
    password?.setValue('1234')

    form.dispatchEvent(new Event('submit'))
    fixture.detectChanges()

    expect(component.authService.login).toHaveBeenCalledTimes(1)
    expect(component.authService.register).not.toHaveBeenCalled()
  })

  it('should call authService.register() when isLogin === false', async () => {
    const { component, fixture } = createComponent({ setInput: { isLogin: false, form } })
    const authForm = findNativeElement(fixture, 'form')
    const username = component.form().get('username')
    const email = component.form().get('email')
    const password = component.form().get('password')
    const confirmPassword = component.form().get('confirmPassword')

    jest.spyOn(component.authService, 'login')
    jest.spyOn(component.authService, 'register')

    email?.setValue('sfailla@gmail.com')
    username?.setValue('sfailla')
    password?.setValue('1234')
    confirmPassword?.setValue('1234')

    authForm.dispatchEvent(new Event('submit'))
    fixture.detectChanges()

    expect(component.authService.register).toHaveBeenCalledTimes(1)
    expect(component.authService.login).not.toHaveBeenCalled()
  })
})
