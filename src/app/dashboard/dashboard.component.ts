import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IonicModule, RouterOutlet],
  template: `
    <h1>Dashboard Works!</h1>
    <ion-router-outlet id="main"></ion-router-outlet>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {}
