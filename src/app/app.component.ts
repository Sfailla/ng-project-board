import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { addIcons } from 'ionicons'
import { ToastComponent } from '@shared/components'
import { AuthService } from '@auth/services'
import {
  logoApple,
  logoGoogle,
  logoGithub,
  closeCircle,
  settingsOutline,
  optionsOutline,
  logOutOutline,
  homeOutline,
  layersOutline,
  listOutline,
  addOutline,
  folderOutline,
  closeCircleOutline,
  checkmarkCircleOutline,
  menu,
  close
} from 'ionicons/icons'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, IonicModule, ToastComponent],
  template: `
    <ion-app>
      <app-toast-message />
      <ion-router-outlet />
    </ion-app>
  `,
  styles: `
    ion-app {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 1;
    }
  `
})
export class AppComponent implements OnInit {
  authService: AuthService = inject(AuthService)

  title = 'Project Board'

  constructor() {
    /**
     * Any icons you want to use in your application
     * can be registered in app.component.ts and then
     * referenced by name anywhere in your application.
     */
    addIcons({
      menu,
      close,
      'logo-apple': logoApple,
      'logo-google': logoGoogle,
      'logo-github': logoGithub,
      'settings-outline': settingsOutline,
      'options-outline': optionsOutline,
      'log-out-outline': logOutOutline,
      'home-outline': homeOutline,
      'layers-outline': layersOutline,
      'list-outline': listOutline,
      'add-outline': addOutline,
      'folder-outline': folderOutline,
      'close-circle': closeCircle,
      'close-circle-outline': closeCircleOutline,
      'checkmark-circle-outline': checkmarkCircleOutline
    })
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.setCurrentUser()
    }
  }
}
