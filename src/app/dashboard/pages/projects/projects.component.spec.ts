import { TestBed } from '@angular/core/testing'
import { ProjectsComponent } from './projects.component'
import { ProjectService } from '@shared/services'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs/internal/observable/of'
import { setupTest } from '@testing/utils'

describe('ProjectsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, RouterTestingModule],
      providers: [
        {
          provide: ProjectService,
          useValue: { getProjectId: () => null, getProjects: () => of([]) }
        }
      ]
    }).compileComponents()
  })

  it('should create', () => {
    const { component } = setupTest(ProjectsComponent)
    expect(component).toBeTruthy()
  })
})
