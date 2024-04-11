import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal
} from '@angular/core'
import { PageWrapperComponent } from '@shared/components'
import { IonicModule } from '@ionic/angular'
import { Project } from '@generated/types'
import { ProjectService } from 'src/app/dashboard/projects/services/project.service'
import { KeyValuePipe } from '@angular/common'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  standalone: true,
  imports: [IonicModule, PageWrapperComponent, KeyValuePipe],
  selector: 'app-task',
  template: `
    <app-page-wrapper>
      <div class="board">
        @for (category of currentProject()?.categories; track category.id) {
          <section class="board__section">
            <div class="board__section-header">
              <span class="board__section-title">{{ category.name }}</span>
              <ion-button color="primary" aria-label="add-task-button" fill="none">
                <ion-icon
                  color="white"
                  aria-label="add-icon"
                  name="add"
                  size="small"
                  slot="icon-only" />
              </ion-button>
            </div>
          </section>
        }
      </div>
    </app-page-wrapper>
  `,
  styles: [
    `
      .board {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        gap: 15px;
        overflow-x: auto;

        &__section {
          width: 100%;
          max-width: 330px;
          min-width: 275px;
          height: 100%;
          padding: 10px;
          border-radius: 8px;
          background-color: var(--dashboard-sub-background);
        }

        &__section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        &__section-title {
          font-size: 16px;
          font-weight: bold;
          color: white;
        }

        ion-button {
          --background: transparent;
          --background-hover: #4a4a4ab8;
          --transition: background-color 3s ease-in-out;
          min-height: 20px;

          &::part(native) {
            padding: 5px;
          }
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit {
  projectService: ProjectService = inject(ProjectService)
  destroyRef: DestroyRef = inject(DestroyRef)

  currentProject = signal<Project | null>(null)

  ngOnInit(): void {
    this.getCurrentProject()
  }

  getCurrentProject(): void {
    const projectId = this.projectService.getProjectId()

    if (!projectId) return

    this.projectService
      .getProjectById(projectId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(project => {
        console.log({ project })
        this.currentProject.set(project)
      })
  }
}
