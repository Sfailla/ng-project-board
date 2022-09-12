import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header/header.component'
import { SideMenuComponent } from './side-menu/side-menu.component'
import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router';
import { LogoComponent } from './logo/logo.component'

@NgModule({
	declarations: [HeaderComponent, SideMenuComponent, LogoComponent],
	imports: [CommonModule, IonicModule, RouterModule],
	exports: [HeaderComponent, SideMenuComponent]
})
export class ComponentsModule {}
