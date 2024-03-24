import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { AuthService } from '@auth/services'
import { ProjectService } from '../../services/project.service'
import { FormControl, FormGroup } from '@angular/forms'

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
            <span>{{ authService.currentUser()?.username }}</span>
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
  styleUrl: './project-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailsComponent {
  authService: AuthService = inject(AuthService)
  projectService: ProjectService = inject(ProjectService)

  form: FormGroup = new FormGroup({
    projectName: new FormControl(''),
    projectDescription: new FormControl('')
  })
}
