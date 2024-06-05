import { TestBed } from '@angular/core/testing'

import { SelectProjectComponent } from './select-project.component'
import { ProjectService } from '@shared/services'
import { RouterTestingModule } from '@angular/router/testing'
import { debug, setupTest } from '@testing/utils'
import { ProjectServiceMock } from '@testing/mocks/services'
import { Apollo } from 'apollo-angular'

describe('SelectProjectComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectProjectComponent, RouterTestingModule],
      providers: [
        Apollo,
        {
          provide: ProjectService,
          useClass: ProjectServiceMock
        }
      ]
    }).compileComponents()
  })

  it('should create', () => {
    const { fixture, component } = setupTest(SelectProjectComponent)
    debug(fixture)
    expect(component).toBeTruthy()
  })
})
