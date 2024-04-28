import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HeaderComponent } from './header.component'
import { AuthService } from '@auth/services'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => false,
            getCurrentUser: () => ({
              id: 'aiy93qhhafr9a',
              email: 'testUser123@gmail.com',
              username: 'testUser',
              firstname: 'test',
              lastname: 'user'
            })
          }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
