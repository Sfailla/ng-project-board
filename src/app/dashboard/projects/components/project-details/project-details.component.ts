import { ChangeDetectionStrategy, Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [IonicModule],
  template: `
    <div class="project-details">
      <div class="project-details__project-name-container">
        <h2>Project Name</h2>
        <ion-input class="project-details__input" type="text" />
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
      <div class="project-details__description-container"></div>
    </div>
  `,
  styles: [
    `
      @use '../../../../styles/abstracts' as *;

      .project-details {
        padding: 24px 8px 11px 8px;

        &__project-name-container {
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;

          & h2 {
            color: var(--color-text-weak);
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
            display: flex;
            align-items: center;
            margin-top: 0;
            margin-bottom: 8px;
          }

          & ion-input {
            height: 36px;
            min-height: 36px;
            padding: 6px 12px;
            font-size: 14px;
            line-height: 22px;
            border: 1px solid #565557;
            border-radius: 6px;

            & .input-highlight {
              display: none;
            }
          }
        }

        &__project-info {
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          column-gap: 16px;

          & .section {
            width: 100%;

            & h3 {
              font-size: 12px;
              line-height: 18px;
              margin-top: 0;
              margin-bottom: 8px;
            }

            & span {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              width: auto;
              height: 36px;
              background-color: rgba(255, 255, 255, 0.06);
              padding-left: 8px;
              border-radius: 6px;
            }
          }
        }

        &__description-container {
          border-top: 1px solid #424244;
          padding-top: 24px;
          padding-bottom: 24px;
          height: 250px;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailsComponent {}
