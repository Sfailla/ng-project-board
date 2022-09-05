import { Component } from '@angular/core'

@Component({
	selector: 'app-root',
	template: `
		<ion-app>
			<div class="app-layout">
				<app-side-menu></app-side-menu>
				<div class="app-layout__content">
					<app-header></app-header>
					<ion-router-outlet></ion-router-outlet>
				</div>
			</div>
		</ion-app>
	`,
	styles: [``]
})
export class AppComponent {
	title = 'ng-project-board'
}
