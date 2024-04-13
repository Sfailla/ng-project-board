import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { ProjectService } from '@shared/services'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { Project } from '@generated/types'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { CreateProjectButtonComponent, SelectProjectButtonComponent } from '../buttons'

@Component({
  selector: 'app-select-project',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    CreateProjectButtonComponent,
    SelectProjectButtonComponent
  ],
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
              <app-create-project-button />

              @for (project of projects(); track project.id; let idx = $index) {
                <app-select-project-button [project]="project" />
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
  projectService: ProjectService = inject(ProjectService)
  destroyRef: DestroyRef = inject(DestroyRef)

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
}
