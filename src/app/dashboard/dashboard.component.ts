import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-dashboard',
	template: `
		<div class="app-layout">
			<app-side-menu></app-side-menu>
			<ion-content class="app-layout__content">
				<app-header></app-header>
				<ion-router-outlet></ion-router-outlet>
			</ion-content>
		</div>
	`,
	styles: [``]
})
export class DashboardComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
