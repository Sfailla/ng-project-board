import { Component, inject, input } from '@angular/core'
import { AuthService } from '@auth/services'
import { User } from '@generated/types'

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  template: `
    <div class="avatar">
      <span class="avatar__initials">{{ avatarInitials() }}</span>
    </div>
  `,
  styles: [
    `
      @use '../../../styles/abstracts' as *;

      .avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        @include flex();
        background-color: var(--ion-color-primary);
        box-shadow:
          0 3px 1px -2px rgba(0, 0, 0, 0.4),
          0 2px 2px 0 rgba(0, 0, 0, 0.28),
          0 1px 5px 0 rgba(0, 0, 0, 0.24);

        &__initials {
          font-size: 12px;
          font-weight: bold;
          color: white;
          letter-spacing: 1px;
        }
      }
    `
  ]
})
export class AvatarComponent {
  user = input.required<User | null>()

  avatarInitials() {
    const user = this.user()
    const { firstname, lastname } = <User>user
    return firstname && lastname ? `${firstname[0]}${lastname[0]}` : ''
  }
}
