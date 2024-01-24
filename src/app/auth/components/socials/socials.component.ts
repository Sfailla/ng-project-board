import { ChangeDetectionStrategy, Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [IonicModule],
  template: `
    <div class="login__socials">
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
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialsComponent {}
