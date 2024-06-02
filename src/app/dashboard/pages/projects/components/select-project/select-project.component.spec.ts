import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SelectProjectComponent } from './select-project.component'
import { ProjectService } from '@shared/services'
import { of } from 'rxjs/internal/observable/of'
import { RouterTestingModule } from '@angular/router/testing'

describe('SelectProjectComponent', () => {
  let component: SelectProjectComponent
  let fixture: ComponentFixture<SelectProjectComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectProjectComponent, RouterTestingModule],
      providers: [
        {
          provide: ProjectService,
          useValue: { getProjectId: () => null, getProjects: () => of([]) }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(SelectProjectComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
