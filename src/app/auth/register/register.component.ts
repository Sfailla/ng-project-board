import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavController } from '@ionic/angular'
import { AuthService } from '../auth.service'

const validateFormFields = () => {
	const username = ['', Validators.minLength(3), Validators.maxLength(20), Validators.required]
	const email = ['', Validators.email, Validators.required]
	const password = ['', Validators.minLength(6), Validators.maxLength(20), Validators.required]
	const confirmPassword = ['', Validators.required]

	return {
		username,
		email,
		password,
		confirmPassword
	}
}

@Component({
	selector: 'app-register',
	template: `
		<ion-content class="ion-padding register">
			<ion-grid class="center">
				<ion-row>
					<ion-col size="12">
						<ion-card class="register__card">
							<ion-card-header class="card-header">
								<ion-card-title class="card-title">Sign up with your email</ion-card-title>
								<ion-card-title class="card-subtitle">
									<span>already have an account?</span>
									<a (click)="navigateTo('auth/login')">Sign in</a>
								</ion-card-title>
							</ion-card-header>
							<ion-card-content class="card-content">
								<form
									[formGroup]="registerForm"
									(ngSubmit)="
										onSubmit(
											registerForm.value.username,
											registerForm.value.email,
											registerForm.value.password,
											registerForm.value.currentPassword
										)
									"
								>
									<ion-item>
										<ion-label position="floating">Username</ion-label>
										<ion-input type="text" formControlName="username"></ion-input>
									</ion-item>
									<ion-item>
										<ion-label position="floating">Email</ion-label>
										<ion-input type="email" formControlName="email"></ion-input>
									</ion-item>
									<ion-item>
										<ion-label position="floating">Password</ion-label>
										<ion-input type="password" formControlName="password"></ion-input>
									</ion-item>
									<ion-item>
										<ion-label position="floating">Confirm Password</ion-label>
										<ion-input type="password" formControlName="confirmPassword"></ion-input>
									</ion-item>
									<ion-button type="submit" expand="block" [disabled]="!registerForm.valid">
										Create account
									</ion-button>
								</form>
							</ion-card-content>
						</ion-card>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	`,
	styles: [
		`
			@import '../../../styles/abstracts';

			.register {
				height: 100%;
				--background: var(--ion-color-primary);

				& .center {
					width: 100%;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}

				&__card {
					width: 100%;
					max-width: 45rem;
					padding: 4rem;
					margin: 0 auto;

					& .card-header {
						width: 100%;
						margin-bottom: 3rem;
						padding: 0 1.6rem;
					}

					& .card-title {
						font-size: 2.4rem;
						font-weight: 600;
						font-family: montserrat;
						color: #5a5a5a;
					}

					& .card-subtitle {
						display: flex;
						align-items: center;
						font-size: 1.4rem;
						color: #a4a4a4;
						line-height: 2.5;

						& a {
							cursor: pointer;
							padding-left: 0.5rem;
						}
					}
				}

				& form {
					& ion-button {
						height: 5rem;
						margin-top: 30px;

						&:disabled {
							opacity: 0.5;

							&::after {
								display: none;
							}
						}
					}
				}

				& ion-item {
					--border-width: 1px;
					--border-color: #dcdcdc;
					--border-radius: 4px;

					&:not(:last-of-type) {
						margin-bottom: 1.5rem;
					}

					&::part(native) {
						height: 4rem;
					}

					& ion-label {
						font-size: 14px;
					}
				}
			}
		`
	]
})
export class RegisterComponent {
	registerForm: FormGroup

	constructor(
		private fb: FormBuilder,
		public navController: NavController,
		private authService: AuthService
	) {
		this.registerForm = this.initializeRegisterForm()
	}

	initializeRegisterForm(): FormGroup {
		const { username, email, password, confirmPassword } = validateFormFields()

		return this.fb.group({
			username,
			email,
			password,
			confirmPassword
		})
	}

	navigateTo(route: string): void {
		this.navController.navigateForward(route)
	}

	onSubmit(username: string, email: string, password: string, confirmPassword: string): void {
		this.authService.register(username, email, password, confirmPassword)
	}
}
