import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  selector: 'app-image-card',
  standalone: true,
  template: `
    <div class="card">
      <div class="top">
        <img src="assets/desktop-setup.svg" alt="desktop-setup" />
      </div>
      <div class="bottom">
        <span class="oval"></span>
        <span [style.background-color]="color()" class="color-oval"></span>
        <div class="markup-container">
          <span class="circle"></span>
          <span class="short-oval"></span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @use '../../../../../../../styles/abstracts' as *;

      .card {
        width: 100%;
        height: rem(184px);
        border-radius: rem(8px);
        border: 1px solid #c9c9c9;
        overflow: hidden;
        display: grid;
        grid-template-rows: 1fr 1fr;

        .top {
          width: 100%;
          background-color: white;
          border-bottom: 1px solid #c9c9c9;
          @include flex();

          & img {
            height: rem(90px);
          }
        }

        .bottom {
          width: 100%;
          background-color: white;
          padding: rem(5px) rem(10px) 0 rem(10px);
          @include flex(space-evenly, flex-start, column);

          & .oval {
            width: 100%;
            height: rem(8px);
            border-radius: 20px;
            background-color: #ebebeb;
          }

          & .color-oval {
            width: rem(55px);
            height: rem(14px);
            border-radius: rem(20px);
          }

          .markup-container {
            @include flex(flex-start, center);
            column-gap: rem(5px);

            & .circle {
              width: rem(25px);
              height: rem(25px);
              border-radius: 50%;
              background-color: #ebebeb;
            }

            & .short-oval {
              width: rem(50px);
              height: rem(8px);
              border-radius: rem(20px);
              background-color: #ebebeb;
            }
          }
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCardComponent {
  color = input.required<string>()
}
