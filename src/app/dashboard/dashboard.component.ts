import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { IonicModule, NavController } from '@ionic/angular'
import { SideMenuComponent, HeaderComponent, SettingsMenuComponent } from './components'
import { LocalStorageService, ProjectService } from '@shared/services'
import { IonicRoutes, LocalStorageKeys } from '@shared/types'
import { ConfirmationComponent, ModalComponent, OverlayComponent } from '@shared/components'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    IonicModule,
    RouterOutlet,
    SideMenuComponent,
    HeaderComponent,
    SettingsMenuComponent,
    ConfirmationComponent,
    OverlayComponent,
    ModalComponent
  ],
  template: `
    <div class="app-layout">
      <app-side-menu />
      <ion-content class="app-layout__content">
        <app-header />
        <app-overlay />
        <app-modal />
        <app-confirmation />
        <app-settings-menu />
        <ion-router-outlet id="main" class="router-outlet" />
      </ion-content>
    </div>
  `,
  styles: [
    `
      ion-content {
        --background: var(--dashboard-main-background);
      }

      ion-router-outlet {
        margin-top: var(--header-height);
      }

      .app-layout {
        &__content {
          position: relative;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  projectService: ProjectService = inject(ProjectService)
  storageService: LocalStorageService = inject(LocalStorageService)
  navController: NavController = inject(NavController)

  ngOnInit(): void {
    this.handleNavigation()
  }

  handleNavigation(): void {
    const projectId = this.storageService.getItem(LocalStorageKeys.PROJECT_ID)

    projectId
      ? this.navController.navigateForward([IonicRoutes.DASHBOARD, projectId, IonicRoutes.BOARD])
      : this.navController.navigateForward([IonicRoutes.DASHBOARD, IonicRoutes.HOME])
  }
}
