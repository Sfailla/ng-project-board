import { Component, OnInit } from '@angular/core'
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

	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.authService.getCurrentSession()
	}
}
