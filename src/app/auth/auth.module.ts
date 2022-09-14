import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterComponent } from './register/register.component'
import { IonicModule } from '@ionic/angular'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './login/login.component'
import { AuthProtectGuard } from './auth-protect.guard'

const routes: Routes = [
	{ path: 'register', component: RegisterComponent, canActivate: [AuthProtectGuard] },
	{ path: 'login', component: LoginComponent, canActivate: [AuthProtectGuard] }
]

@NgModule({
	declarations: [RegisterComponent, LoginComponent],
	imports: [
		CommonModule,
		IonicModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule
	]
})
export class AuthModule {}
