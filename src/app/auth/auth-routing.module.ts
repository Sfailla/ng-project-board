import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthProtectGuard } from './auth-protect.guard'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

const routes: Routes = [
	{ path: 'register', component: RegisterComponent, canActivate: [AuthProtectGuard] },
	{ path: 'login', component: LoginComponent, canActivate: [AuthProtectGuard] }
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
