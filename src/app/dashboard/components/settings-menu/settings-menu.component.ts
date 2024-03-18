import { Component, DestroyRef, inject } from '@angular/core'
import { AuthService } from '../../../auth/services/auth.service'
import { IonicModule } from '@ionic/angular'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-menu class="settings-menu" side="end" type="overlay" menuId="settings" contentId="main">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Settings Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item lines="full">
            <ion-icon slot="start" name="options-outline" />
            <ion-label>Settings</ion-label>
          </ion-item>
          <ion-item (click)="logout()" lines="full">
            <ion-icon slot="start" name="log-out-outline" />
            <ion-label>Logout</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
  `,
  styleUrl: './settings-menu.component.scss'
})
export class SettingsMenuComponent {
  authService: AuthService = inject(AuthService)
  destroyRef: DestroyRef = inject(DestroyRef)

  logout() {
    this.authService.logout().pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }
}
