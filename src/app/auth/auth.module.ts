import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterComponent } from './register/register.component'
import { IonicModule } from '@ionic/angular'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './login/login.component'
import { AuthRoutingModule } from './auth-routing.module'

@NgModule({
	declarations: [RegisterComponent, LoginComponent],
	imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, AuthRoutingModule]
})
export class AuthModule {}
