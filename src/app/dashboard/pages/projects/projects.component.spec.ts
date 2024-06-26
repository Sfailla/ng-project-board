import { TestBed } from '@angular/core/testing'
import { ProjectsComponent } from './projects.component'
import { ProjectService } from '@shared/services'
import { RouterTestingModule } from '@angular/router/testing'
import { setupTest } from '@testing/utils'
import { ProjectServiceMock } from '@testing/mocks/services'
import { Apollo } from 'apollo-angular'

describe('ProjectsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, RouterTestingModule],
      providers: [Apollo, { provide: ProjectService, useClass: ProjectServiceMock }]
    }).compileComponents()
  })

  it('should create', () => {
    const { component } = setupTest(ProjectsComponent)
    expect(component).toBeTruthy()
  })
})
