import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <div class="header__post"></div>
      <div class="header__toolbar">
        <div class="header__logo">
          <h3 class="header__logo--text">Project Board</h3>
          <!-- <img src="assets/images/logo.png" alt="logo" /> -->
        </div>
        <div class="header__profile">
          <div class="header__profile-photo">
            <!-- <img src="assets/images/profile.jpg" alt="profile" /> -->
          </div>
          <div class="header__profile-info">
            <span class="header__profile-name">User 1</span>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      @import '../../../styles/abstracts';

      .header {
        height: var(--header-height);
        display: flex;

        &__toolbar {
          width: 100%;
          @include flex(space-between, center);
          padding: 0 20px;
          background-color: #fff;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        }

        &__post {
          width: 6rem;
          height: var(--header-height);
          background-color: #0285ff;
        }

        &__logo {
          @include flex(flex-start);

          &--text {
            color: #0285ff;
          }
        }

        &__logo img {
          width: 100px;
        }

        &__profile {
          @include flex(flex-start);
        }

        &__profile-photo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #ccc;
        }

        &__profile-info {
          @include flex(flex-start);
          margin-left: 10px;
        }

        &__profile-name {
          font-size: 14px;
          font-weight: bold;
          color: #00a8ff;
          text-transform: uppercase;
        }
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
