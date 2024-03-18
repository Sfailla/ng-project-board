import { Component, inject } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { MenuController } from '@ionic/angular/standalone'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonicModule],
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
              src="https://ionicframework.com/docs/demos/api/avatar/avatar.svg" />
          </ion-avatar>
          <div class="header__profile-info">
            <span class="header__profile-name">Sfailla</span>
          </div>
        </div>
        <div class="header__profile-settings">
          <ion-menu-button menu="settings" autoHide="false">
            <ion-icon name="settings-outline" />
          </ion-menu-button>
        </div>
      </div>
    </ion-header>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menu: MenuController = inject(MenuController)

  async toggleSideMenu() {
    await this.menu.toggle('settings')
  }
}
