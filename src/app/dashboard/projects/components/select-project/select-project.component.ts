import { Component, DestroyRef, ElementRef, OnInit, inject, signal } from '@angular/core'
import { IonicModule, NavController } from '@ionic/angular'
import { ProjectService } from '../../services/project.service'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { TokenService } from '../../../../auth/services'
import { Project } from '../../../../../generated/types.graphql-gen'
import { ConfirmationHeader, ConfirmationMessage, Routes } from '../../../../shared-types'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ConfirmationService } from '../../../../shared/services/confirmation/confirmation.service'

@Component({
  selector: 'app-select-project',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  template: `
    <div>
      <ion-card class="project-card">
        <ion-card-header class="project-card__header">
          <ion-card-title>
            <ion-text>Projects</ion-text>
          </ion-card-title>
        </ion-card-header>

        <ion-card-content class="project-card__content">
          <div class="project-card__projects-container">
            <ul>
              <li class="create-project">
                <a [routerLink]="Routes.CREATE_PROJECT" routerDirection="forward">
                  <span>
                    <ion-icon name="add-outline" />
                  </span>
                  <ion-label class="create-project-title">Create Project</ion-label>
                </a>
              </li>
              @for (project of projects(); track project.id; let idx = $index) {
                <li class="select-project" (click)="setCurrentProjectId(project.id)">
                  <div class="left-side">
                    <span class="project-button">
                      <ion-icon slot="start" name="folder-outline" />
                    </span>
                    <ion-label slot="end">{{ project.name }}</ion-label>
                  </div>
                  <div class="right-side">
                    <div class="project-icon-container">
                      <span role="button">
                        <ion-icon src="assets/pencil.svg" />
                      </span>
                      <span role="button" (click)="deleteProject($event, project.id)">
                        <ion-icon src="assets/trash.svg" />
                      </span>
                    </div>
                  </div>
                </li>
              }
            </ul>
          </div>
        </ion-card-content>
        <div class="ion-card-footer"></div>
      </ion-card>
    </div>
  `,
  styleUrls: ['select-project.component.scss']
})
export class SelectProjectComponent implements OnInit {
  confirmationService: ConfirmationService = inject(ConfirmationService)
  projectService: ProjectService = inject(ProjectService)
  navController: NavController = inject(NavController)
  tokenService: TokenService = inject(TokenService)
  destroyRef: DestroyRef = inject(DestroyRef)
  elementRef: ElementRef = inject(ElementRef)

  Routes: typeof Routes = Routes
  ConfirmationHeader: typeof ConfirmationHeader = ConfirmationHeader
  ConfirmationMessage: typeof ConfirmationMessage = ConfirmationMessage

  projects = signal<Project[] | null>(null)

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects(): void {
    this.projectService
      .getProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(projects => this.projects.set(projects))
  }

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

  async setCurrentProjectId(projectId: string): Promise<void> {
    this.projectService.setProjectId(projectId)
    await this.navController.navigateForward(['dashboard', projectId, 'tasks'])
  }
}
