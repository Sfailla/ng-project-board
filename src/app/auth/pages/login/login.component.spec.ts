import { TestBed } from '@angular/core/testing'
import { LoginComponent } from './login.component'
import { AuthServiceMock } from '@testing/mocks/services'
import { Apollo } from 'apollo-angular'
import { AuthService } from '@auth/services'
import { provideRouter } from '@angular/router'

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        { provide: Apollo, useValue: {} },
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LoginComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
