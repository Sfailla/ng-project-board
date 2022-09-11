import { Component } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { NavController } from '@ionic/angular'

@Component({
	selector: 'app-login',
	template: `
		<ion-content class="ion-padding login">
			<ion-grid class="center">
				<ion-row>
					<ion-col size="12">
						<ion-card class="login__card">
							<ion-card-header class="card-header">
								<ion-card-title class="card-title">Sign in with your email</ion-card-title>
								<ion-card-title class="card-subtitle">
									<span>don't have an account?</span>
									<a (click)="navigateTo('auth/register')">Sign up</a>
								</ion-card-title>
							</ion-card-header>
							<ion-card-content class="card-content">
								<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
									<ion-item>
										<ion-label position="floating">Email</ion-label>
										<ion-input type="email" formControlName="email"></ion-input>
									</ion-item>
									<ion-item>
										<ion-label position="floating">Password</ion-label>
										<ion-input type="password" formControlName="password"></ion-input>
									</ion-item>
									<ion-button type="submit" expand="block" [disabled]="!loginForm.valid">
										Sign in
									</ion-button>
								</form>

								<div class="login__content-break">or</div>

								<div class="login__socials">
									<a class="circle-link">
										<ion-icon name="logo-google"></ion-icon>
									</a>
									<a class="circle-link">
										<ion-icon name="logo-github"></ion-icon>
									</a>
									<a class="circle-link">
										<ion-icon name="logo-apple"></ion-icon>
									</a>
								</div>
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

			.login {
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
					@include flex(flex-start, center, column);

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

					& .card-content {
						width: 100%;
						flex: 1;
					}
				}

				&__content-break {
					width: 100%;
					display: grid;
					grid-template-columns: 1fr min-content 1fr;
					column-gap: 1rem;
					margin: 4rem 0 3rem;
					align-items: center;
					text-transform: uppercase;
					font-weight: 600;
					font-size: 1.4rem;

					&::before,
					&::after {
						content: '';
						display: block;
						height: 1px;
						background: #e0e0e0;
					}
				}

				&__socials {
					width: 100%;
					max-width: 20rem;
					margin: 0 auto;
					@include flex(space-around);

					& .circle-link {
						height: 40px;
						width: 40px;
						border-radius: 40px;
						margin: 8px;
						background-color: white;
						@include flex();
						cursor: pointer;
						outline: none;
						appearance: none;
						box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.15);
						transition: 0.3s ease-out;

						&:hover {
							transform: translateY(-0.2rem);
						}

						& ion-icon {
							font-size: 1.8rem;

							&[name='logo-google'] {
								color: #db4437;
							}

							&[name='logo-github'] {
								color: #000;
							}

							&[name='logo-apple'] {
								color: #000;
							}
						}
					}
				}
			}

			ion-button {
				height: 5rem;
				margin-top: 30px;

				&:disabled {
					opacity: 0.5;

					&::after {
						display: none;
					}
				}
			}

			ion-item {
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
		`
	]
})
export class LoginComponent {
	loginForm: FormGroup

	constructor(private fb: FormBuilder, public navCtrl: NavController) {
		this.loginForm = this.fb.group({
			email: [''],
			password: ['']
		})
	}

	navigateTo(route: string): void {
		this.navCtrl.navigateForward(route)
	}

	onSubmit() {}
}
