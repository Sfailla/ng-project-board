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
import { CategoryService, ProjectService } from '@shared/services'
import { CommonModule } from '@angular/common'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { map } from 'rxjs/internal/operators/map'
import { CdkDropList, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Observable } from 'rxjs/internal/Observable'
import { BoardSectionComponent } from './components'
import { getDataAndSetSignals, SetSignals } from '@shared/utils'

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule, PageWrapperComponent, BoardSectionComponent, CdkDropList],
  selector: 'app-task',
  template: `
    <app-page-wrapper>
      <div
        class="board"
        cdkDropListOrientation="horizontal"
        (cdkDropListDropped)="drop($event)"
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
        @include flex(space-between, stretch);
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
  categoryService: CategoryService = inject(CategoryService)
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
      this.categories.set(this.sortCategoriesByDisplayOrder(state.categories))
    }
  }

  sortCategoriesByDisplayOrder(categories: Category[]): Category[] {
    return categories.map(category => category).sort((a, b) => a.displayOrder - b.displayOrder)
  }

  updateCategoryDisplayOrder(categories: Category[]): void {
    this.categoryService
      .updateCategories(categories)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }

  drop(event: CdkDragDrop<Category[]>): void {
    const updatedCategories: Category[] = []

    moveItemInArray(this.categories(), event.previousIndex, event.currentIndex)

    this.categories().forEach((category, index) => {
      updatedCategories.push({
        id: category.id,
        displayOrder: index,
        status: category.status,
        name: category.name
      })
    })

    this.updateCategoryDisplayOrder(updatedCategories)
  }
}
