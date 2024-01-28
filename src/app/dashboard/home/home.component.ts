import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { SelectProjectComponent } from '../projects/components'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, SelectProjectComponent],
  template: `
    <div class="page-container home">
      <h1 class="home__title">Home</h1>
      <app-select-project></app-select-project>
    </div>
  `,
  styles: [
    `
      .home {
        &__title {
          text-transform: uppercase;
          margin: 2rem 0;
        }
      }
    `
  ]
})
export class HomeComponent {
  constructor() {}
}
