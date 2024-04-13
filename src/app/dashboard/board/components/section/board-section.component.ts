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
    </section>
  `,
  styleUrl: './board-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardSectionComponent {
  category = input.required<string>()
}
