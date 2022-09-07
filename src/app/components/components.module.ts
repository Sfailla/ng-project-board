import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header/header.component'
import { SideMenuComponent } from './side-menu/side-menu.component'
import { IonicModule } from '@ionic/angular'

@NgModule({
	declarations: [HeaderComponent, SideMenuComponent],
	imports: [CommonModule, IonicModule],
	exports: [HeaderComponent, SideMenuComponent]
})
export class ComponentsModule {}
