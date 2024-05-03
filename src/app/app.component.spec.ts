import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { AuthService } from './auth/services'
import { provideRouter } from '@angular/router'
import { MockAuthService } from '@testing/mocks/services'
import { Apollo } from 'apollo-angular'
import { AUTH_ROUTES } from './auth/auth.routes'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(AUTH_ROUTES),
        { provide: Apollo, useValue: {} },
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
