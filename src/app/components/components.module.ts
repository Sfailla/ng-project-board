import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header/header.component'
import { SideMenuComponent } from './side-menu/side-menu.component'
import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router'
import { LogoComponent } from './logo/logo.component'
import { SharedModule } from '../shared/shared.module'
import { SettingsMenuComponent } from './settings-menu/settings-menu.component'

@NgModule({
	declarations: [HeaderComponent, SideMenuComponent, LogoComponent, SettingsMenuComponent],
	imports: [CommonModule, IonicModule, RouterModule, SharedModule],
	exports: [HeaderComponent, SideMenuComponent, SettingsMenuComponent]
})
export class ComponentsModule {}
