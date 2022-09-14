import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard.component'
import { IonicModule } from '@ionic/angular'
import { ComponentsModule } from 'src/app/components/components.module'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../auth/auth.guard'

const routes: Routes = [{ path: '', component: DashboardComponent, canActivate: [AuthGuard] }]

@NgModule({
	declarations: [DashboardComponent],
	imports: [CommonModule, IonicModule, ComponentsModule, RouterModule.forChild(routes)]
})
export class DashboardModule {}
