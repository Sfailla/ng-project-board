import { Component } from '@angular/core'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div class="page-container home">
      <h1>Home Page works!</h1>
      <!-- <app-select-project></app-select-project> -->
    </div>
  `,
  styles: [``]
})
export class HomeComponent {
  constructor() {}
}
