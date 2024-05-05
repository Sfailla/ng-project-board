import { Component, OnInit, inject, signal } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { MenuController } from '@ionic/angular/standalone'
import { AuthService } from '@auth/services'
import { User } from '@generated/types'
import { AvatarComponent } from '@shared/components'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonicModule, AvatarComponent],
  template: `
    <ion-header class="ion-no-border header" collapse="fade">
      <div class="header__toolbar">
        <div class="header__logo">
          <ion-title class="header__logo--text">Project Board</ion-title>
        </div>
        <div class="header__profile" slot="end">
          <app-avatar [user]="user()" />
          <div class="header__profile-info">
            <span class="header__profile-name">{{ user()?.username }}</span>
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
  styleUrl: 'style.component.scss'
})
export class HeaderComponent implements OnInit {
  menu: MenuController = inject(MenuController)
  authService: AuthService = inject(AuthService)

  user = signal<User | null>(null)

  ngOnInit(): void {
    this.setUser()
  }

  async toggleSideMenu() {
    await this.menu.toggle('settings')
  }

  setUser() {
    this.user.set(this.authService.getCurrentUser())
  }
}
