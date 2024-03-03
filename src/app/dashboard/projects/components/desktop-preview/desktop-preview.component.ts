import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ColorCardComponent } from './color-card/color-card.component'
import { ImageCardComponent } from './image-card/image-card.component'

@Component({
  selector: 'app-desktop-preview',
  standalone: true,
  imports: [ColorCardComponent, ImageCardComponent],
  template: `
    <div class="preview-screen">
      <header class="preview-screen__header">
        <span class="square-block"></span>
        <div class="container">
          <span class="searchbar"></span>
          <div class="window-controls">
            <span class="circle"></span>
          </div>
        </div>
      </header>

      <div class="preview-screen__content">
        <div class="grid-view">
          <section class="section">
            <h3 class="section__title">Todo</h3>
            <div class="grid-view__content">
              <app-color-card [color]="'#14aaf5'" />
              <app-color-card [color]="'#8C83E7'" />
            </div>
          </section>
          <section class="section">
            <h3 class="section__title">In Progress</h3>
            <div class="grid-view__content">
              <app-image-card color="#4573D1" />
            </div>
          </section>
          <section class="section">
            <h3 class="section__title">Done</h3>
            <div class="grid-view__content">
              <app-color-card [color]="'#14aaf5'" />
              <app-color-card [color]="'#8C83E7'" />
              <app-color-card [color]="'#4573D1'" />
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./desktop-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopPreviewComponent {}
