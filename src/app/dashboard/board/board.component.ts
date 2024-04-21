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
import { Category, Project } from '@generated/types'
import { ProjectService } from '@shared/services'
import { CommonModule } from '@angular/common'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { map } from 'rxjs/internal/operators/map'
import { CdkDropList, CdkDragDrop, moveItemInArray, CdkDropListGroup } from '@angular/cdk/drag-drop'
import { Observable } from 'rxjs/internal/Observable'
import { BoardSectionComponent } from './components'
import { getDataAndSetSignals, SetSignals } from '@shared/utils'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    PageWrapperComponent,
    BoardSectionComponent,
    CdkDropListGroup,
    CdkDropList
  ],
  selector: 'app-task',
  template: `
    <app-page-wrapper>
      <div
        class="board"
        cdkDropListOrientation="horizontal"
        (cdkDropListDropped)="drop($event)"
        cdkDropListGroup
        cdkDropList>
        @for (category of this.categories(); track category) {
          <app-board-section [categories]="categories()" [category]="category"></app-board-section>
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
        @include flex(space-between, space-between);
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
  categories = signal<Category[]>([])

  ngOnInit(): void {
    getDataAndSetSignals(this.getCurrentProject(), this.setSignals())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }

  getCurrentProject(): Observable<NonNullable<Project>> {
    const projectId = <string>this.projectService.getProjectId()
    return this.projectService.getProjectById(projectId).pipe(map(project => project))
  }

  setSignals(): SetSignals<Project> {
    return state => {
      this.currentProject.set(state)
      this.categories.set(state?.categories.map(category => category))
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.categories(), event.previousIndex, event.currentIndex)
  }
}
