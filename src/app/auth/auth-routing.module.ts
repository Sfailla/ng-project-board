import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { AuthProtectGuard } from './auth-protect.guard'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

const routes: Routes = [
	{ path: 'register', component: RegisterComponent, canActivate: [AuthProtectGuard] },
	{ path: 'login', component: LoginComponent, canActivate: [AuthProtectGuard] }
]

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule]
})
export class AuthRoutingRoutingModule {}
