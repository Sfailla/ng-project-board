import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ProjectsComponent } from './projects.component'
import { ProjectService } from '@shared/services'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs/internal/observable/of'

describe('ProjectsComponent', () => {
  let component: ProjectsComponent
  let fixture: ComponentFixture<ProjectsComponent>

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

    fixture = TestBed.createComponent(ProjectsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
