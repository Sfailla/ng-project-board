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
import { CdkDropList, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Observable } from 'rxjs/internal/Observable'
import { BoardSectionComponent } from './components'

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule, PageWrapperComponent, CdkDropList, BoardSectionComponent],
  selector: 'app-task',
  template: `
    <app-page-wrapper>
      <div
        class="board"
        cdkDropListOrientation="horizontal"
        (cdkDropListDropped)="drop($event)"
        cdkDropList>
        @for (category of this.categories(); track category) {
          <app-board-section [category]="category"></app-board-section>
        }
      </div>
    </app-page-wrapper>
  `,
  styles: [
    `
      @use '../../styles/abstracts' as *;

      .board.cdk-drop-list-dragging {
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
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
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
      map(project => project)
    )
  }

  setSignals(project: Project): void {
    this.currentProject.set(project)
    this.categories.set(project?.categories.map(({ name }) => name))
  }

  getProjectAndSetSignals = <T extends Observable<NonNullable<Project>>>(observable: T) => {
    return observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(project => {
      if (!project) return
      this.setSignals(project)
    })
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.categories(), event.previousIndex, event.currentIndex)
  }
}
