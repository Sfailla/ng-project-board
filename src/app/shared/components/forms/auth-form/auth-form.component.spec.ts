import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AuthFormComponent } from './auth-form.component'
import { AuthService } from '@auth/services'
import { RouterOutlet } from '@angular/router'
import { MockAuthService } from '@testing/mocks/services'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { debug, findAllNativeElements, findNativeElement } from '@testing/utils'
import { Apollo } from 'apollo-angular'

function createComponent({ setInput = { isLogin: true } } = {}) {
  const fixture: ComponentFixture<AuthFormComponent> = TestBed.createComponent(AuthFormComponent)
  const component: AuthFormComponent = fixture.componentInstance

  fixture.componentRef.setInput('isLogin', setInput.isLogin)
  fixture.componentRef.setInput(
    'form',
    new FormGroup({
      username: new FormControl('', Validators.min(4)),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.min(4)]),
      confirmPassword: new FormControl('', Validators.min(4))
    })
  )

  fixture.detectChanges()

  return { fixture, component }
}

describe('AuthFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormComponent],
      providers: [
        RouterOutlet,
        { provide: Apollo, useValue: {} },
        {
          provide: AuthService,
          useClass: MockAuthService
        }
      ]
    }).compileComponents()
  })

  it('should create AuthFormComponent', () => {
    const { component, fixture } = createComponent()
    debug(fixture)
    expect(component).toBeTruthy()
  })

  it('should only have email and password field if isLogin === true', () => {
    const { fixture } = createComponent()
    const inputs = findAllNativeElements(fixture, 'ion-input')

    expect(inputs.length).toBe(2)
  })

  it('should have username | confirm-password fields if isLogin === false', () => {
    const { fixture } = createComponent({ setInput: { isLogin: false } })
    const inputs = findAllNativeElements(fixture, 'ion-input')

    expect(inputs.length).toBe(4)
  })

  it('submit button should be disabled, then enabled when inputs are filled out', () => {
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

  it('should call submit() fn when form is submitted', () => {
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
})
