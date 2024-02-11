import { Component, input } from '@angular/core'

@Component({
  standalone: true,
  selector: 'app-page-wrapper',
  template: `
    <div class="page-wrapper page-container">
      <h1 class="page-wrapper__title">{{ title() }}</h1>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      .page-wrapper {
        width: 100%;
        height: 100%;

        &__title {
          text-transform: uppercase;
          margin: 2rem 0;
        }
      }
    `
  ]
})
export class PageWrapperComponent {
  title = input.required<string>()
}
