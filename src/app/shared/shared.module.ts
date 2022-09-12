import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonIconTitleDirective } from './directives/icon-title.directive'
import { IonicModule } from '@ionic/angular'

@NgModule({
	declarations: [IonIconTitleDirective],
	imports: [CommonModule, IonicModule],
	exports: [IonIconTitleDirective]
})
export class SharedModule {}
