import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  signal
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { Category, Task, TaskInput } from '@generated/types'
import { ProjectService, TaskService } from '@shared/services'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { TaskComponent } from '../task/task.component'
import { map } from 'rxjs/internal/operators/map'
import { Observable } from 'rxjs/internal/Observable'
import { getDataAndSetSignals, SetSignals } from '@shared/utils'

@Component({
  selector: 'app-board-section',
  standalone: true,
  imports: [IonicModule, TaskComponent, CdkDropList, CdkDrag],
  template: `
    <section class="board-section" cdkDragLockAxis="x" cdkDrag>
      <div class="board-section__header">
        <span class="board-section__title">{{ category().name }}</span>
        <ion-button color="primary" aria-label="add-task-button" fill="none">
          <ion-icon color="white" aria-label="add-icon" name="add" size="small" slot="icon-only" />
        </ion-button>
      </div>
      <div
        class="board-section__content"
        [id]="category().name"
        (cdkDropListDropped)="drop($event)"
        [cdkDropListConnectedTo]="dropListConnectedTo()"
        [cdkDropListData]="tasks()"
        cdkDropList>
        @for (task of tasks(); track task.id) {
          <app-task [task]="task" />
        }
      </div>
    </section>
  `,
  styleUrl: './board-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardSectionComponent implements OnInit {
  categories = input.required<Category[]>()
  category = input.required<Category>()

  taskService: TaskService = inject(TaskService)
  projectService: ProjectService = inject(ProjectService)
  destroyRef: DestroyRef = inject(DestroyRef)

  tasks = signal<Task[]>([])

  ngOnInit(): void {
    getDataAndSetSignals(this.getTasks(), this.setSignal())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }

  getTasks(): Observable<Task[]> {
    const projectId = <string>this.projectService.getProjectId()
    return this.taskService.getTasks(projectId).pipe(map(tasks => tasks))
  }

  setSignal(): SetSignals<Task[]> {
    return state => {
      return this.tasks.set(this.filterTasksByStatus(state))
    }
  }

  filterTasksByStatus(tasks: Task[]): Task[] {
    return tasks.filter(task => task.status === this.category().status)
  }

  updateTaskStatusOnDrop(taskInput: TaskInput): void {
    this.taskService.updateTask(taskInput).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }

  dropListConnectedTo(): string[] {
    return this.categories()
      .filter(category => category.status !== this.category().status)
      .map(category => category.name)
  }

  drop(event: CdkDragDrop<Task[]>) {
    const statusMap: Record<string, string> = {
      Open: 'open',
      'In Progress': 'in-progress',
      'In Review': 'in-review',
      Complete: 'complete'
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )

      this.updateTaskStatusOnDrop({
        id: this.tasks()[event.currentIndex].id,
        projectId: this.tasks()[event.currentIndex].project.id,
        status: statusMap[event.container.id]
      })
    }
  }
}
