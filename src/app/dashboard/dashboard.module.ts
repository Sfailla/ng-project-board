import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard.component'
import { IonicModule } from '@ionic/angular'
import { ComponentsModule } from 'src/app/components/components.module'
import { DashboardRoutingModule } from './dashboard-routing.module'

@NgModule({
	declarations: [DashboardComponent],
	imports: [CommonModule, IonicModule, ComponentsModule, DashboardRoutingModule]
})
export class DashboardModule {}
