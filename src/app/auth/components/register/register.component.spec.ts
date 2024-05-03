import { TestBed } from '@angular/core/testing'
import { RegisterComponent } from './register.component'
import { MockAuthService } from '@testing/mocks/services'
import { Apollo } from 'apollo-angular'
import { AuthService } from '@auth/services'
import { provideRouter } from '@angular/router'

describe('RegisterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideRouter([]),
        { provide: Apollo, useValue: {} },
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RegisterComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
