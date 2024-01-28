import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { SideMenuComponent, HeaderComponent, SettingsMenuComponent } from './components'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IonicModule, RouterOutlet, SideMenuComponent, HeaderComponent, SettingsMenuComponent],
  template: `
    <div class="app-layout">
      <app-side-menu></app-side-menu>
      <ion-content class="app-layout__content page-container">
        <app-header></app-header>
        <app-settings-menu></app-settings-menu>
        <ion-router-outlet id="main" class="router-outlet"></ion-router-outlet>
      </ion-content>
    </div>
  `,
  styles: [
    `
      ion-content {
        --background: var(--dashboard-main-background);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {}
