import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-create-project-form',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
  template: `
    <form class="form" [formGroup]="form()">
      <ion-item>
        <ion-input formControlName="projectName" label="Project Name" labelPlacement="floating" />
      </ion-item>
      <ion-item>
        <ion-textarea
          formControlName="projectDescription"
          label="Project Description"
          labelPlacement="floating" />
      </ion-item>
      <div class="form__select-view">
        <h3>Default View</h3>
        <div class="toggle-button-container">
          <button aria-pressed="true" class="toggle-button selected" type="button">
            <ion-icon src="/assets/boards.svg" />
            Grid
          </button>
          <button aria-pressed="false" class="toggle-button" type="button">
            <ion-icon name="list-outline" />
            List
          </button>
        </div>
      </div>
      <ion-button
        type="submit"
        expand="block"
        color="primary"
        [disabled]="!form().valid"
        (click)="createProject()()">
        Create Project
      </ion-button>
    </form>
  `,
  styles: [
    `
      @use '../../../../styles/abstracts' as *;

      .form {
        margin: rem(40px) 0 rem(60px) 0;
        ion-item {
          --background: var(--dashboard-sub-background);
          --border-color: var(--create-project-card-border-color);
          --border-radius: rem(5px);
          --padding-start: 0;
          --padding-end: 0;
          --padding-bottom: rem(16px);
        }

        &__select-view {
          margin: 4rem 0;

          & h3 {
            color: white;
            font-size: rem(15px);
            margin-bottom: rem(16px);
          }

          & .toggle-button-container {
            @include flex(space-between);

            & button {
              width: rem(150px);
              height: rem(80px);
              font-size: rem(16px);
              color: var(--heading-color-primary);
              @include flex();
              border: 1px solid var(--create-project-card-border-color);
              border-radius: rem(5px);
              margin-bottom: rem(16px);
              background-color: transparent;

              &.selected {
                background-color: #428cff1c;
                border: 1px solid var(--ion-color-primary);
              }

              & ion-icon {
                font-size: rem(25px);
                margin-right: rem(10px);

                &[name='list-outline'] {
                  font-size: rem(30px);
                  color: var(--ion-color-danger);
                }
              }
            }
          }
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProjectFormComponent {
  form = input.required<FormGroup>()
  createProject = input.required<() => void>()
}
