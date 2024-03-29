import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { LogoComponent } from '../logo/logo.component'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { IonIconTitleDirective } from '../../../shared/directives/icon-title/icon-title.directive'
import { CommonModule } from '@angular/common'
import { LocalStorageService } from '../../../shared/services'
import { LocalStorageKeys, Routes } from '../../../shared-types'
import { ProjectService } from '../../projects/services/project.service'

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LogoComponent,
    IonIconTitleDirective
  ],
  template: `
    <div
      class="side-menu"
      [ngClass]="isMenuExpanded() ? 'side-menu--expanded' : 'side-menu--collapsed'">
      <ion-header class="ion-no-border side-menu__header">
        <ion-toolbar color="primary">
          <ion-buttons slot="end">
            <ion-button class="ion-menu-button ion-activatable" (click)="toggleMenu()">
              <ion-icon name="menu" />
              <ion-ripple-effect />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <div class="side-menu__branding">
        <app-logo />
      </div>
      <ion-content class="side-menu__content">
        <ion-list class="side-menu__nav" lines="full">
          <ion-item
            class="side-menu__nav-item"
            [routerLink]="Routes.HOME"
            routerDirection="root"
            routerLinkActive="is-active">
            <ion-icon [style.width]="isMenuExpanded() ? '15px' : '100%'" name="home-outline" />
            @if (isMenuExpanded()) {
              <ion-label [ngClass]="isMenuExpanded() ? 'show-label' : 'hide-label'">Home</ion-label>
            }
          </ion-item>
          <ion-item
            class="side-menu__nav-item"
            [routerLink]="Routes.PROJECTS"
            routerLinkActive="is-active"
            routerDirection="root">
            <ion-icon
              [style.width]="isMenuExpanded() ? '15px' : '100%'"
              name="layers-outline"
              ionIconRemoveTitle
              [iconTitle]="'Projects'" />
            @if (isMenuExpanded()) {
              <ion-label [ngClass]="isMenuExpanded() ? 'show-label' : 'hide-label'">
                Projects
              </ion-label>
            }
          </ion-item>
          @if (projectService.getProjectId()) {
            <ion-item
              class="side-menu__nav-item"
              [routerLink]="['/', 'dashboard', projectService.getProjectId(), 'tasks']"
              routerLinkActive="is-active"
              routerDirection="root">
              <ion-icon
                [style.width]="isMenuExpanded() ? '15px' : '100%'"
                name="list-outline"
                ionIconRemoveTitle
                [iconTitle]="'Tasks'" />
              @if (isMenuExpanded()) {
                <ion-label [ngClass]="isMenuExpanded() ? 'show-label' : 'hide-label'">
                  Tasks
                </ion-label>
              }
            </ion-item>
          }
        </ion-list>
      </ion-content>
    </div>
  `,
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent implements OnInit {
  menuState = signal<boolean>(true)
  isMenuExpanded = computed(() => this.menuState())

  Routes: typeof Routes = Routes

  storageService: LocalStorageService = inject(LocalStorageService)
  projectService: ProjectService = inject(ProjectService)

  ngOnInit(): void {
    this.menuState.set(
      JSON.parse(this.storageService.getItem(LocalStorageKeys.MENU_EXPANDED) as string)
    )
  }

  toggleMenu() {
    this.menuState.set(!this.menuState())
    this.storageService.setItem(LocalStorageKeys.MENU_EXPANDED, JSON.stringify(this.menuState()))
  }
}
