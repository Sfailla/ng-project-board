import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterComponent } from './register/register.component'
import { IonicModule } from '@ionic/angular'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [{ path: 'register', component: RegisterComponent }]

@NgModule({
	declarations: [RegisterComponent],
	imports: [CommonModule, IonicModule, RouterModule.forChild(routes)]
})
export class AuthModule {}
