import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <app-side-menu></app-side-menu>
    <router-outlet></router-outlet>
  `,
  styles: [``],
})
export class AppComponent {
  title = 'ng-project-board';
}
