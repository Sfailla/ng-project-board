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
      @import '../../../styles/abstracts';

      .socials {
        width: 100%;
        max-width: 20rem;
        margin: 0 auto;
        @include flex(space-around);

        & .circle-link {
          height: 40px;
          width: 40px;
          border-radius: 40px;
          margin: 8px;
          background-color: white;
          @include flex();
          cursor: pointer;
          outline: none;
          appearance: none;
          box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.15);
          transition: 0.3s ease-out;

          &:hover {
            transform: translateY(-0.2rem);
          }

          & ion-icon {
            font-size: 1.8rem;

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
