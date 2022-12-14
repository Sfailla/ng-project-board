import { Component } from '@angular/core'
import { MenuController } from '@ionic/angular'

@Component({
	selector: 'app-header',
	template: `
		<ion-header class="ion-no-border header" collapse="fade">
			<div class="header__toolbar">
				<div class="header__logo">
					<ion-title class="header__logo--text">Project Board</ion-title>
				</div>
				<div class="header__profile" slot="end">
					<ion-avatar class="header__profile-photo">
						<img
							alt="Silhouette of a person's head"
							src="https://ionicframework.com/docs/demos/api/avatar/avatar.svg"
						/>
					</ion-avatar>
					<div class="header__profile-info">
						<span class="header__profile-name">Sfailla</span>
					</div>
				</div>
				<div class="header__profile-settings">
					<ion-icon (click)="toggleSideMenu()" name="settings-outline"></ion-icon>
				</div>
			</div>
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
					padding: 0 1rem;
					background-color: #fff;
					display: grid;
					grid-template-columns: min-content 1fr 5rem;
					align-items: center;
				}

				&__logo {
					&--text {
						font-size: 1.5rem;
						text-transform: uppercase;
						color: var(--ion-color-medium-shade);
					}
				}

				&__logo img {
					width: 100px;
				}

				&__profile {
					padding-right: 2rem;
					@include flex(flex-end);
				}

				&__profile-photo {
					width: 3rem;
					height: 3rem;
					border-radius: 50%;
					background-color: #e5e5e5;
				}

				&__profile-info {
					@include flex(flex-start);
					margin-left: 5px;
				}

				&__profile-name {
					font-size: 14px;
					font-weight: bold;
					letter-spacing: 0.5px;
					color: var(--ion-color-medium-shade);
					text-transform: uppercase;
				}

				&__profile-settings {
					width: 6rem;
					height: 100%;
					color: var(--ion-color-medium-shade);
					border-left: $primary-border;
					@include flex();
					position: relative;

					&:hover {
						color: var(--ion-color-danger);

						& ion-icon {
							transform: rotate(-60deg);
						}
					}

					& ion-icon {
						font-size: 2rem;
						cursor: pointer;
						transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
					}
				}
			}
		`
	]
})
export class HeaderComponent {
	constructor(private menu: MenuController) {}

	openSettingsMenu() {
		const settingsMenu = document.querySelector('.header__settings-menu')
		settingsMenu?.classList.toggle('header__settings-menu--active')
	}

	toggleSideMenu() {
		this.menu.toggle('end')
	}
}
