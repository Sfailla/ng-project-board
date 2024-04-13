import { ChangeDetectionStrategy, Component, DestroyRef, inject, input } from '@angular/core'
import { RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { NavController } from '@ionic/angular/standalone'
import { Routes, IonicRoutes, ConfirmationHeader, ConfirmationMessage } from '@shared/types'
import { Project } from '@generated/types'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ConfirmationService, ModalService } from '@shared/services'
import { ProjectDetailsComponent } from '../../project-details/project-details.component'
import { ProjectService } from '../../../services/project.service'

@Component({
  selector: 'app-select-project-button',
  standalone: true,
  imports: [IonicModule, RouterModule],
  template: `
    <li class="select-project" (click)="setCurrentProjectId(project().id)">
      <div class="left-side">
        <span class="project-button">
          <ion-icon slot="start" name="folder-outline" />
        </span>
        <ion-label slot="end">{{ project().name }}</ion-label>
      </div>

      <div class="right-side">
        <div class="project-icon-container">
          <span role="button" (click)="projectDetails($event, project())">
            <ion-icon src="assets/pencil.svg" />
          </span>
          <span role="button" (click)="deleteProject($event, project().id)">
            <ion-icon src="assets/trash.svg" />
          </span>
        </div>
      </div>
    </li>
  `,
  styleUrl: 'select-project-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectProjectButtonComponent {
  confirmationService: ConfirmationService = inject(ConfirmationService)
  projectService: ProjectService = inject(ProjectService)
  navController: NavController = inject(NavController)
  modalService: ModalService = inject(ModalService)
  destroyRef: DestroyRef = inject(DestroyRef)

  Routes: typeof Routes = Routes
  IonicRoutes: typeof IonicRoutes = IonicRoutes
  ConfirmationHeader: typeof ConfirmationHeader = ConfirmationHeader
  ConfirmationMessage: typeof ConfirmationMessage = ConfirmationMessage

  project = input.required<Project>()

  deleteProject(event: Event, projectId: string) {
    event.stopPropagation()

    this.confirmationService.create({
      header: ConfirmationHeader.DELETE_PROJECT,
      message: ConfirmationMessage.DELETE_PROJECT,
      onSuccess: () => {
        this.handleDeleteOnConfirmation(projectId)
      }
    })

    this.confirmationService.present()
  }

  handleDeleteOnConfirmation = (projectId: string) => {
    this.projectService
      .deleteProject(projectId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }

  projectDetails(event: Event, project: Project) {
    event.stopPropagation()

    this.modalService.create({
      title: 'Project Details',
      component: ProjectDetailsComponent,
      componentProps: { project }
    })

    this.modalService.present()
  }

  async setCurrentProjectId(projectId: string): Promise<void> {
    this.projectService.setProjectId(projectId)

    await this.navController.navigateForward(
      [IonicRoutes.DASHBOARD, projectId, IonicRoutes.BOARD],
      { animationDirection: 'back' }
    )
  }
}
