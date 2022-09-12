import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-side-menu',
	template: `
		<div
			class="side-menu"
			[ngClass]="isMenuExpanded ? 'side-menu--expanded' : 'side-menu--collapsed'"
		>
			<ion-header class="side-menu__header">
				<ion-toolbar color="primary">
					<ion-buttons slot="end">
						<ion-button class="ion-menu-button ion-activatable" (click)="toggleMenu()">
							<ion-icon name="menu"></ion-icon>
							<ion-ripple-effect></ion-ripple-effect>
						</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<div class="side-menu__branding">
				<app-logo></app-logo>
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
				height: 100%;
				background-color: #ffffff;
				border-right: 1px solid #e5e5e5;
				transition: width 0.3s ease-in-out;

				&--expanded {
					width: var(--menu-width-expanded);
				}

				&--collapsed {
					width: var(--menu-width-collapsed);
				}

				& .ion-menu-button {
					width: 4.5rem;
					height: 4.5rem;
					position: relative;
					overflow: hidden;
					margin-right: 0.8rem;
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

				& ion-label {
					font-size: 1.4rem;
					padding-left: 1rem;
					visibility: visible;
					opacity: 1;
					transition: all 0.3s ease-in-out;
				}

				&--collapsed ion-label {
					visibility: hidden;
					padding-left: 0;
					opacity: 0;
				}
			}
		`
	]
})
export class SideMenuComponent implements OnInit {
	isMenuExpanded = true

	constructor() {}

	ngOnInit(): void {}

	toggleMenu() {
		return (this.isMenuExpanded = !this.isMenuExpanded)
	}
}
