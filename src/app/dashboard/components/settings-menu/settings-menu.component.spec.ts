import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SettingsMenuComponent } from './settings-menu.component'
import { AuthService } from '@auth/services'
import { IonicModule } from '@ionic/angular'

describe('SettingsMenuComponent', () => {
  let component: SettingsMenuComponent
  let fixture: ComponentFixture<SettingsMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsMenuComponent, IonicModule],
      providers: [{ provide: AuthService, useValue: { logout: () => {} } }]
    }).compileComponents()

    fixture = TestBed.createComponent(SettingsMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
