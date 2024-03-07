import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core'
import { IonicModule, NavController } from '@ionic/angular'
import { ProjectService } from '../../services/project.service'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { TokenService } from '../../../../auth/services'
import { Project } from '../../../../../generated/types.graphql-gen'
import { Routes } from '../../../../shared-types'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-select-project',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  template: `
    <div class="">
      <ion-card class="project-card">
        <ion-card-header class="project-card__header">
          <ion-card-title>
            <ion-text>Projects</ion-text>
          </ion-card-title>
        </ion-card-header>

        <ion-card-content class="project-card__content">
          <div class="available-projects">
            <ul>
              <li>
                <a
                  class="create-project"
                  [routerLink]="Routes.CREATE_PROJECT"
                  routerDirection="forward">
                  <span>
                    <ion-icon name="add-outline" />
                  </span>
                  <ion-label class="create-project-title">Create Project</ion-label>
                </a>
              </li>
              @for (project of projects(); track project.id; let idx = $index) {
                <li
                  (click)="setCurrentProjectId(project.id)"
                  (keyup)="handleKeyUp($event)"
                  [tabindex]="idx">
                  <span class="project-button">
                    <ion-icon slot="start" name="folder-outline" />
                  </span>
                  <ion-label slot="end">{{ project.name }}</ion-label>
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
  navController: NavController = inject(NavController)
  projectService: ProjectService = inject(ProjectService)
  tokenService: TokenService = inject(TokenService)
  destroyRef: DestroyRef = inject(DestroyRef)

  Routes: typeof Routes = Routes
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

  async setCurrentProjectId(projectId: string): Promise<void> {
    this.projectService.setProjectId(projectId)
    await this.navController.navigateForward(['dashboard', projectId, 'tasks'])
  }

  handleKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      event.target?.dispatchEvent(new Event('click'))
    }
  }
}
