import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Routes } from '../types'
import { AuthTokenService } from './auth/auth-token.service'
import { AuthService } from './auth/auth.service'

@Component({
	selector: 'app-root',
	template: `
		<ion-app>
			<ion-router-outlet></ion-router-outlet>
		</ion-app>
	`,
	styles: [``]
})
export class AppComponent implements OnInit {
	title = 'ng-project-board'

	constructor(
		private authService: AuthService,
		private tokenService: AuthTokenService,
		private router: Router
	) {}

	ngOnInit() {
		if (this.tokenService.getUser()) {
			this.authService.getCurrentSession()
		} else {
			this.router.navigate([Routes.Login])
		}
	}
}
