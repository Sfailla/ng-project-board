import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { addIcons } from 'ionicons'
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
import { ToastMessageComponent } from './shared/components'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, IonicModule, ToastMessageComponent],
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
export class AppComponent {
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
}
