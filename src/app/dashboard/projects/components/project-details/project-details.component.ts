import { ChangeDetectionStrategy, Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [IonicModule],
  template: `
    <div class="project-details">
      <form>
        <div class="project-details__project-name-container">
          <h2>Project Name</h2>
          <ion-item>
            <ion-input aria-label="Project Name" class="project-details__input" type="text" />
          </ion-item>
        </div>
        <div class="project-details__project-info">
          <div class="section owner">
            <h3>Owner</h3>
            <span>SFailla</span>
          </div>
          <div class="section due-date">
            <h3>Due Date</h3>
            <span>no due date</span>
          </div>
        </div>
        <div class="project-details__description-container">
          <h2>Project Description</h2>
          <ion-item>
            <ion-textarea
              aria-label="Project Description"
              class="project-details__description"
              minlength="50" />
          </ion-item>
        </div>

        <ion-button color="primary" expand="block" type="submit">Save</ion-button>
      </form>
    </div>
  `,
  styles: [
    `
      @use '../../../../styles/abstracts' as *;

      .project-details {
        padding: rem(24px) rem(8px) rem(11px) rem(8px);

        &__project-name-container {
          margin-bottom: rem(16px);
          @include flex(flex-start, flex-start, column);

          & h2 {
            color: var(--color-text-weak);
            font-weight: 500;
            font-size: rem(12px);
            line-height: rem(18px);
            margin-top: 0;
            margin-bottom: rem(8px);
            @include flex(flex-start);
          }
          & ion-item {
            width: 100%;
            height: rem(36px);
            border: 1px solid #565557;
            border-radius: rem(6px);
            --background: #1e1f21;
          }

          & ion-input {
            height: rem(36px);
            min-height: rem(36px);
            font-size: rem(14px);
            line-height: rem(22px);
            transform: translateY(rem(-7px));
          }
        }

        &__project-info {
          margin-bottom: rem(16px);
          column-gap: rem(16px);
          @include flex(space-between);

          & .section {
            width: 100%;

            & h3 {
              font-size: rem(12px);
              line-height: rem(18px);
              margin-top: 0;
              margin-bottom: rem(8px);
            }

            & span {
              width: auto;
              height: rem(36px);
              background-color: rgba(255, 255, 255, 0.06);
              padding-left: rem(8px);
              border-radius: rem(6px);
              @include flex(flex-start);
            }
          }
        }

        &__description-container {
          border-top: 1px solid #424244;
          padding-top: rem(24px);
          padding-bottom: rem(24px);
          height: rem(250px);

          & h2 {
            color: var(--heading-color-primary);
            padding-bottom: rem(rem(10px));
            font-size: rem(16px);
            font-weight: 500;
            line-height: rem(20px);
          }

          & ion-item {
            --background: #1e1f21;
            border: rem(1px) solid #565557;
            border-radius: rem(6px);
          }

          & ion-textarea {
            background-color: inherit;
            min-height: rem(150px);
          }
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailsComponent {}
