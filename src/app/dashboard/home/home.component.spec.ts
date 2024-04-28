import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HomeComponent } from './home.component'
import { ProjectService } from '@shared/services'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs/internal/observable/of'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

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

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
