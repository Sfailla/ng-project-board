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
  styles: [
    `
      .card {
        width: 100%;
        height: auto;
        min-height: 150px;
        padding: 10px;
        background-color: #181818;
        border-radius: 8px;
        display: grid;
        grid-template-rows: repeat(2, min-content) 1fr min-content;
        row-gap: 10px;

        &__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;

          & .tag {
            display: flex;
            align-items: center;
            padding: 5px;
            border-radius: 4px;
            background-color: #000;

            & .tag-color {
              display: block;
              width: 10px;
              height: 10px;
              border-radius: 2px;
            }

            & .tag-name {
              font-size: 10px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: #b7b7b7;
              margin-left: 5px;
            }
          }
        }

        &__title {
          width: 100%;
          height: 100%;
          font-size: 15px;
          font-weight: bold;
          text-transform: capitalize;
          letter-spacing: 1px;
          padding-top: 5px;
          color: #d8d8d8;
        }

        &__description {
          font-size: 12px;
          color: #8f8f8f;
        }

        &__footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          & .avatar {
          }
          & .date {
            height: 100%;

            & span {
              height: 22px;
              display: flex;
              align-items: center;
              justify-content: flex-start;
            }
          }
        }
      }

      .cdk-drag-preview {
        box-sizing: border-box;
        position: fixed;
        top: 0;
      }

      .cdk-drag-placeholder {
        background-color: #1e1e1e !important;
        border: 2px dashed #4a4a4a;
        margin-bottom: 10px;
        box-sizing: border-box;

        .card__tags,
        .card__title,
        .card__description,
        .card__footer {
          display: none;
          padding: 0;
          margin: 0;
        }
      }

      .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      div.card:not(.cdk-drag-placeholder) {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
    `
  ]
})
export class TaskComponent {
  task = input.required<Task>()
}
