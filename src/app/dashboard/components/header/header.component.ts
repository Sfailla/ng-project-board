import { Component, inject } from '@angular/core'
import { IonicModule, MenuController } from '@ionic/angular'

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
  styles: [
    `
      @use '../../../styles/abstracts' as *;

      ion-menu-button {
        width: 4rem;
        height: 4rem;
      }

      .header {
        width: 100%;
        height: var(--header-height);
        background-color: var(--dashboard-sub-background);
        border-bottom: 1px solid var(--dashboard-border-color);
        z-index: 1;

        &__toolbar {
          width: 100%;
          height: 100%;
          padding: 0 0 0 2rem;
          display: grid;
          grid-template-columns: min-content 1fr 6rem;
          align-items: center;
        }

        &__logo {
          &--text {
            font-size: 1.5rem;
            font-family: montserrat;
            text-transform: uppercase;
            color: var(--heading-color-primary);
          }
        }

        &__logo img {
          width: 100px;
        }

        &__profile {
          padding-right: 2rem;
          @include flex(flex-end);
        }

        &__profile-photo {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }

        &__profile-info {
          @include flex(flex-start);
          margin-left: 5px;
        }

        &__profile-name {
          font-size: 14px;
          font-weight: bold;
          letter-spacing: 0.5px;
          color: var(--heading-color-primary);
          text-transform: uppercase;
        }

        &__profile-settings {
          width: 6rem;
          height: 100%;
          color: var(--heading-color-primary);
          border-left: 1px solid var(--dashboard-border-color);
          @include flex();
          position: relative;

          &:hover {
            color: var(--ion-color-primary);

            & ion-icon {
              transform: rotate(-60deg);
            }
          }

          & ion-icon {
            font-size: 2rem;
            cursor: pointer;
            transition:
              transform 0.3s ease-in-out,
              color 0.3s ease-in-out;
          }
        }
      }
    `
  ]
})
export class HeaderComponent {
  menu: MenuController = inject(MenuController)

  async toggleSideMenu() {
    await this.menu.toggle('settings')
  }
}
