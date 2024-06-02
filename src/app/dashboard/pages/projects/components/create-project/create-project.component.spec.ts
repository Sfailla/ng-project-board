import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateProjectComponent } from './create-project.component'
import { ProjectService } from '@shared/services'
import { of } from 'rxjs/internal/observable/of'

describe('CreateProjectComponent', () => {
  let component: CreateProjectComponent
  let fixture: ComponentFixture<CreateProjectComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProjectComponent],
      providers: [
        {
          provide: ProjectService,
          useValue: { getProjectId: () => null, getProjects: () => of([]) }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(CreateProjectComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
