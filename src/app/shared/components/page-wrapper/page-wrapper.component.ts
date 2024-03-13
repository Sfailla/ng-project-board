import { Component, input } from '@angular/core'

@Component({
  standalone: true,
  selector: 'app-page-wrapper',
  template: `
    <div class="page-wrapper page-container">
      @if (title()) {
        <h2 class="page-wrapper__title">{{ title() }}</h2>
      }
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      @use '../../../styles/abstracts' as *;

      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      .page-wrapper {
        width: 100%;
        height: 100%;

        &__title {
          font-size: rem(20.4px);
          text-transform: uppercase;
          margin: rem(20px) 0 rem(36px) 0;
        }
      }
    `
  ]
})
export class PageWrapperComponent {
  title = input<string>()
}
