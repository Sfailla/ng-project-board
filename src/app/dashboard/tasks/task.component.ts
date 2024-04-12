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
import { CommonModule } from '@angular/common'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { map } from 'rxjs/internal/operators/map'
import {
  CdkDropList,
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  CdkDropListGroup
} from '@angular/cdk/drag-drop'
import { Observable } from 'rxjs/internal/Observable'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    PageWrapperComponent,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup
  ],
  selector: 'app-task',
  template: `
    <app-page-wrapper>
      <div
        class="board"
        cdkDropListOrientation="horizontal"
        (cdkDropListDropped)="drop($event)"
        cdkDropList>
        @for (category of this.categories(); track category) {
          <section class="board__section" cdkDragLockAxis="x" cdkDrag>
            <div class="board__section-header">
              <span class="board__section-title">{{ category }}</span>
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
      .cdk-drag-preview {
        box-sizing: border-box;
        width: 100%;
        max-width: 330px;
        min-width: 275px;
        height: 100%;
        margin: 0;
        padding: 10px;
        border-radius: 8px;
        background-color: var(--dashboard-sub-background);

        div.board__section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        span.board__section-title {
          font-size: 16px;
          font-weight: bold;
          color: white;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
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

      .cdk-drag-placeholder {
        background-color: #1e1e1e !important;
        border: 2px dashed #4a4a4a;

        div.board__section-header {
          display: none;
        }
      }

      .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      .board.cdk-drop-list-dragging .board__section:not(.cdk-drag-placeholder) {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

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
  categories = signal<string[]>([])

  ngOnInit(): void {
    this.getProjectAndSetSignals(this.getCurrentProject())
  }

  getCurrentProject(): Observable<NonNullable<Project>> {
    const projectId = <string>this.projectService.getProjectId()

    return this.projectService.getProjectById(projectId).pipe(
      takeUntilDestroyed(this.destroyRef),
      map(project => project as Project)
    )
  }

  setSignals(project: Project): void {
    this.currentProject.set(project)
    this.categories.set(project?.categories.map(({ name }) => name))
  }

  getProjectAndSetSignals = <T extends Observable<NonNullable<Project>>>(getProjectsObsFn: T) => {
    return getProjectsObsFn.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(project => {
      if (!project) return
      this.setSignals(project)
    })
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.categories(), event.previousIndex, event.currentIndex)
  }
}
