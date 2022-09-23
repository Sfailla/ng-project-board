import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-dashboard',
	template: `
		<div class="app-layout">
			<app-side-menu></app-side-menu>
			<ion-content class="app-layout__content">
				<app-header></app-header>
				<app-settings-menu></app-settings-menu>
				<ion-router-outlet id="main" class="router-outlet"></ion-router-outlet>
			</ion-content>
		</div>
	`,
	styles: [
		`
			@import '../../styles/abstracts';

			.router-outlet {
				margin-top: var(--header-height);
				background-color: $background-color;
			}
		`
	]
})
export class DashboardComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
