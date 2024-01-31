import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core'
import { IonicModule, NavController } from '@ionic/angular'
import { ProjectService } from '../../services/project.service'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { TokenService } from '../../../../auth/services'
import { Subscription } from 'rxjs/internal/Subscription'
import { Project } from '../../../../../generated/types.graphql-gen'

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
                  routerLink="/dashboard/projects/create"
                  routerDirection="forward">
                  <span>
                    <ion-icon name="add-outline"></ion-icon>
                  </span>
                  <ion-label class="create-project-title">Create Project</ion-label>
                </a>
              </li>
              <li *ngFor="let project of projects()">
                <span class="project-button">
                  <ion-icon slot="start" name="folder-outline"></ion-icon>
                </span>
                <ion-label slot="end">{{ project.name }}</ion-label>
              </li>
            </ul>
          </div>
        </ion-card-content>
        <div class="ion-card-footer"></div>
      </ion-card>
    </div>
  `,
  styleUrls: ['select-project.component.scss']
})
export class SelectProjectComponent implements OnInit, OnDestroy {
  navController: NavController = inject(NavController)
  projectService: ProjectService = inject(ProjectService)
  tokenService: TokenService = inject(TokenService)

  subscription: Subscription = new Subscription()
  projects = signal<Project[]>([])

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    this.subscription.add(
      this.projectService.getProjects().subscribe(projects => {
        this.projects.set(projects)
      })
    )
  }

  setCurrentProjectId(projectId: string) {
    this.projectService.setProjectId(projectId)
    this.navController.navigateForward(['dashboard', projectId, 'tasks'])
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
