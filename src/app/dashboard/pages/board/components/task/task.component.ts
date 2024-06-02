import { Component, input } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { Task } from '@generated/types'
import { CdkDrag } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [IonicModule, CdkDrag],
  template: `
    <ion-card class="card" cdkDrag>
      <div class="card__header">
        <div class="card__tags">
          @for (tag of task().tags; track tag) {
            <div class="tag">
              <span [style.background-color]="tag.color" class="tag-color"></span>
              <span class="tag-name">{{ tag.name }}</span>
            </div>
          }
        </div>
      </div>

      <div class="card__title">
        <ion-text>{{ task().title }}</ion-text>
      </div>

      <div class="card__description">
        <ion-text>
          <p>{{ task().description }}</p>
        </ion-text>
      </div>

      <div class="card__footer">
        <div class="card__avatar">
          <span></span>
        </div>
        <div class="card__date">
          <span>Apr 3</span>
        </div>
      </div>
    </ion-card>
  `,
  styleUrl: 'style.component.scss'
})
export class TaskComponent {
  task = input.required<Task>()
}
