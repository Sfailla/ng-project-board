import { TestBed } from '@angular/core/testing'
import { RegisterComponent } from './register.component'
import { AuthServiceMock } from '@testing/mocks/services'
import { Apollo } from 'apollo-angular'
import { AuthService } from '@auth/services'
import { provideRouter } from '@angular/router'
import { setupTest } from '@testing/utils'

describe('RegisterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideRouter([]),
        { provide: Apollo, useValue: {} },
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    }).compileComponents()
  })

  it('should create the app', () => {
    const { component: app } = setupTest(RegisterComponent)
    expect(app).toBeTruthy()
  })
})
