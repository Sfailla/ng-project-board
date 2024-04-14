import { CdkDrag } from '@angular/cdk/drag-drop'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-board-section',
  standalone: true,
  imports: [IonicModule, CdkDrag],
  template: `
    <section class="board-section" cdkDragLockAxis="x" cdkDrag>
      <div class="board-section__header">
        <span class="board-section__title">{{ category() }}</span>
        <ion-button color="primary" aria-label="add-task-button" fill="none">
          <ion-icon color="white" aria-label="add-icon" name="add" size="small" slot="icon-only" />
        </ion-button>
      </div>
      <div class="board-section__content">
        <ion-card class="card">
          <div class="card__header">
            <div class="card__tags">
              <div class="tag">
                <span class="tag-color"></span>
                <span class="tag-name">ui/ux</span>
              </div>
              <div class="tag">
                <span class="tag-color"></span>
                <span class="tag-name">ui/ux</span>
              </div>
              <div class="tag">
                <span class="tag-color"></span>
                <span class="tag-name">ui/ux</span>
              </div>
            </div>
            <div class="card__date">
              <span>Apr 3</span>
            </div>
          </div>
          <div class="card__title">
            <ion-text>Design a new logo</ion-text>
          </div>
          <div class="card__footer">
            <div class="card__avatar">
              <img src="https://randomuser.me/api/portraits" alt="avatar" />
            </div>
          </div>
        </ion-card>
      </div>
    </section>
  `,
  styleUrl: './board-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardSectionComponent {
  category = input.required<string>()
}
