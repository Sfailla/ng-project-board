import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-header',
	template: `
		<ion-header class="ion-no-border header" collapse="fade">
			<ion-toolbar class="header__toolbar">
				<div class="header__profile" slot="end">
					<div class="header__profile-photo">
						<!-- <img src="assets/images/profile.jpg" alt="profile" /> -->
					</div>
					<div class="header__profile-info">
						<span class="header__profile-name">User 1</span>
					</div>
				</div>
				<div class="header__logo">
					<ion-title class="header__logo--text">Project Board</ion-title>
				</div>
			</ion-toolbar>
		</ion-header>
	`,
	styles: [
		`
			@import '../../../styles/abstracts';

			.header {
				width: 100%;
				height: var(--header-height);
				border-bottom: $primary-border;

				&__toolbar {
					width: 100%;
					height: 100%;
					@include flex(space-between);
					padding: 0 20px;
					background-color: #fff;
				}

				&__logo {
					&--text {
						font-size: 1.5rem;
						text-transform: uppercase;
						color: var(--ion-color-primary);
					}
				}

				&__logo img {
					width: 100px;
				}

				&__profile {
					@include flex(flex-start);
				}

				&__profile-photo {
					width: 3.5rem;
					height: 3.5rem;
					border-radius: 50%;
					background-color: #e5e5e5;
				}

				&__profile-info {
					@include flex(flex-start);
					margin-left: 10px;
				}

				&__profile-name {
					font-size: 14px;
					font-weight: bold;
					color: $primary-color;
					text-transform: uppercase;
				}
			}
		`
	]
})
export class HeaderComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
