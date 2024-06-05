import { TestBed } from '@angular/core/testing'
import { HomeComponent } from './home.component'
import { ProjectService } from '@shared/services'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs/internal/observable/of'
import { setupTest } from '@testing/utils'

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
      providers: [
        {
          provide: ProjectService,
          useValue: { getProjectId: () => null, getProjects: () => of([]) }
        }
      ]
    }).compileComponents()
  })

  it('should create', () => {
    const { component } = setupTest(HomeComponent)
    expect(component).toBeTruthy()
  })
})
