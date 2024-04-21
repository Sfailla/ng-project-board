import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-create-project-form',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
  template: `
    <form class="form" [formGroup]="form()" (ngSubmit)="submitForm()">
      <div class="form__input-wrapper">
        <ion-input
          aria-label="project-name"
          formControlName="projectName"
          label="Project Name"
          labelPlacement="floating"
          fill="outline" />

        <ion-textarea
          aria-label="project-description"
          formControlName="projectDescription"
          label="Project Description"
          labelPlacement="floating"
          [autoGrow]="true"
          [rows]="5"
          fill="outline" />
      </div>

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
        aria-label="submit-button"
        type="submit"
        expand="block"
        color="primary"
        [disabled]="form().invalid">
        Create Project
      </ion-button>
    </form>
  `,
  styleUrl: './style.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProjectFormComponent {
  form = input.required<FormGroup>()
  createProject = input.required<() => void>()

  submitForm = () => this.createProject()()
}
