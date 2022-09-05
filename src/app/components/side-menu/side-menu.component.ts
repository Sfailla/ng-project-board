import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-side-menu',
	template: `
		<div class="side-menu">
			<div class="side-menu__header">
				<span class="side-menu__header--logo"></span>
				<span class="side-menu__header--logo-inner"></span>
			</div>
			<div class="side-menu__content">
				<ion-list class="side-menu__nav" lines="full">
					<ion-item class="side-menu__nav-item" routerLink="/home" routerDirection="root">
						<ion-icon name="home-outline"></ion-icon>
						<ion-label>Home</ion-label>
					</ion-item>
					<ion-item class="side-menu__nav-item" routerLink="/tasks" routerDirection="root">
						<ion-icon slot="start" name="list-outline"></ion-icon>
						<ion-label>Tasks</ion-label>
					</ion-item>
					<ion-item class="side-menu__nav-item" routerLink="/projects" routerDirection="root">
						<ion-icon name="layers-outline"></ion-icon>
						<ion-label>Projects</ion-label>
					</ion-item>
				</ion-list>
			</div>
		</div>
	`,
	styles: [
		`
			@import '../../../styles/abstracts';

			:host {
				z-index: 1;
			}

			.side-menu {
				width: var(--menu-width);
				height: 100%;
				background-color: #ffffff;
				border-right: 1px solid #e5e5e5;

				&__header {
					width: 100%;
					height: 60px;
					@include flex();
					position: relative;
					border-bottom: 1px solid #e5e5e5;
					background-color: var(--ion-color-primary);

					&--logo {
						width: 3rem;
						height: 3rem;
						position: relative;
						display: block;
						@include flex();
						background-color: $primary-color;
						-webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
						clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);

						&::before {
							content: '';
							display: block;
							height: 2.5rem;
							width: 2.5rem;
							background-color: white;
							-webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
							clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
						}

						&::after {
							content: '';
							width: 2rem;
							height: 2rem;
							display: block;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							background-color: $primary-color;
							-webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
							clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
						}
					}

					&--logo-inner {
						width: 1.5rem;
						height: 1.5rem;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						display: block;
						background-color: #ffffff;
						-webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
						clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);

						&::after {
							content: '';
							width: 1rem;
							height: 1rem;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							display: block;
							background-color: $primary-color;
							-webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
							clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
						}
					}
				}

				&__content {
					height: calc(100% - 60px);
					overflow-y: auto;
				}

				&__nav {
					padding: 0;
					@include flex(center, flex-start, column);
				}

				&__nav-item {
					width: 100%;
					--background-hover: var(--ion-color-primary);

					&:last-child {
						width: 100%;
						display: block;
					}

					& ion-icon {
						margin-right: 1rem;
					}

					& ion-label {
						font-size: 1.4rem;
					}
				}
			}
		`
	]
})
export class SideMenuComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
