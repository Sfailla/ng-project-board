import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-side-menu',
	template: `
		<div class="side-menu">
			<ion-header class="side-menu__header">
				<ion-toolbar color="primary">
					<ion-buttons slot="end">
						<ion-button class="ion-menu-button ion-activatable">
							<ion-icon name="menu"></ion-icon>
							<ion-ripple-effect></ion-ripple-effect>
						</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<div class="side-menu__branding">
				<span class="side-menu__branding--logo"></span>
				<span class="side-menu__branding--logo-inner"></span>
			</div>
			<ion-content class="side-menu__content">
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
			</ion-content>
		</div>
	`,
	styles: [
		`
			@import '../../../styles/abstracts';

			.side-menu {
				width: var(--menu-width);
				height: 100%;
				background-color: #ffffff;
				border-right: 1px solid #e5e5e5;

				& .ion-menu-button {
					width: 4.5rem;
					height: 4.5rem;
					position: relative;
					overflow: hidden;
					margin-right: 1rem;
					--background: transparent;
					--color: #ffffff;
					--border-radius: 50%;

					--background-hover: #ffffff;
					--color-hover: #ffffff;

					&::part(native) {
						transition: background 0.25s ease-in-out;
					}

					&:hover {
						--background: rgba(255, 255, 255, 0.1);
						--color: #ffffff;
					}

					& ion-icon {
						width: 2.4rem;
						height: 2.4rem;
						margin: 0;
						padding: 0;
					}
				}

				&__header {
					width: 100%;
					height: 60px;
					@include flex();
					position: relative;
					border-bottom: 1px solid #e5e5e5;
					background-color: var(--ion-color-primary);

					&::after {
						height: 0;
					}
				}

				&__branding {
					width: 100%;
					height: 6rem;
					@include flex();
					padding: 1rem;
					position: relative;

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
					height: calc(100% - var(--header-height));
					overflow-y: auto;
				}

				&__nav {
					padding: 0;
					@include flex(center, flex-start, column);
				}

				&__nav-item {
					width: 100%;
					cursor: pointer;
					--background-hover: var(--ion-color-primary);

					&:first-child {
						border-top: 1px solid #e5e5e5;
					}

					&:last-child {
						width: 100%;
						display: block;
					}
				}

				& ion-icon {
					margin-right: 1rem;
				}

				& ion-label {
					font-size: 1.4rem;
				}
			}
		`
	]
})
export class SideMenuComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
