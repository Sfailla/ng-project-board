import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SideMenuComponent } from './side-menu.component'
import { ProjectService } from '../../../shared/services'
import { RouterTestingModule } from '@angular/router/testing'

describe('SideMenuComponent', () => {
  let component: SideMenuComponent
  let fixture: ComponentFixture<SideMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuComponent, RouterTestingModule],
      providers: [{ provide: ProjectService, useValue: { getProjectId: () => null } }]
    }).compileComponents()

    fixture = TestBed.createComponent(SideMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
