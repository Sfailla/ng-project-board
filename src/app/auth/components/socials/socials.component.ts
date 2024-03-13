import { ChangeDetectionStrategy, Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [IonicModule],
  template: `
    <div class="socials">
      <a class="circle-link">
        <ion-icon name="logo-google"></ion-icon>
      </a>
      <a class="circle-link">
        <ion-icon name="logo-github"></ion-icon>
      </a>
      <a class="circle-link">
        <ion-icon name="logo-apple"></ion-icon>
      </a>
    </div>
  `,
  styles: [
    `
      @use '../../../styles/abstracts' as *;

      .socials {
        width: 100%;
        max-width: rem(200px);
        margin: 0 auto;
        @include flex(space-around);

        & .circle-link {
          height: rem(40px);
          width: rem(40px);
          border-radius: rem(40px);
          margin: rem(8px);
          background-color: white;
          @include flex();
          cursor: pointer;
          outline: none;
          appearance: none;
          box-shadow: 0 rem(1px) rem(2px) rem(1px) rgba(0, 0, 0, 0.15);
          transition: 0.3s ease-out;

          &:hover {
            transform: translateY(rem(-2px));
          }

          & ion-icon {
            font-size: rem(18px);

            &[name='logo-google'] {
              color: #db4437;
            }

            &[name='logo-github'] {
              color: #000;
            }

            &[name='logo-apple'] {
              color: #000;
            }
          }
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialsComponent {}
