import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  selector: 'app-color-card',
  standalone: true,
  template: `
    <div class="card">
      <span class="oval"></span>
      <span [style.background-color]="color()" class="color-oval"></span>
      <div class="markup-container">
        <span class="circle"></span>
        <span class="short-oval"></span>
      </div>
    </div>
  `,
  styles: [
    `
      @use '../../../../../styles/abstracts' as *;

      .card {
        width: 100%;
        height: 8.7rem;
        background-color: white;
        border-radius: 8px;
        border: 1px solid #c9c9c9;
        padding: 0.5rem 1rem 0 1rem;
        margin-bottom: 1rem;
        @include flex(space-evenly, flex-start, column);

        & .oval {
          width: 100%;
          height: 0.8rem;
          border-radius: 20px;
          background-color: #ebebeb;
        }

        & .color-oval {
          width: 5.5rem;
          height: 1.4rem;
          border-radius: 20px;
        }

        .markup-container {
          @include flex(flex-start, center);
          column-gap: 5px;

          & .circle {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            background-color: #ebebeb;
          }

          & .short-oval {
            width: 5rem;
            height: 0.8rem;
            border-radius: 20px;
            background-color: #ebebeb;
          }
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorCardComponent {
  color = input.required<string>()
}
