import { Injectable, inject } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { TaskDocument, TaskQuery, TasksDocument, TasksQuery } from '@generated/queries'
import { CreateTaskDocument, CreateTaskMutation } from '@generated/mutations'
import { TaskInput } from '@generated/types'
import { ToastService } from '@shared/services'
import { ToastType } from '@shared/types'
import { map } from 'rxjs/internal/operators/map'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apollo: Apollo = inject(Apollo)
  toastService: ToastService = inject(ToastService)

  getTasksQuery(projectId: string) {
    return this.apollo.query<TasksQuery>({
      errorPolicy: 'all',
      query: TasksDocument,
      variables: { projectId }
    })
  }

  getTasks(projectId: string) {
    return this.getTasksQuery(projectId).pipe(
      map(({ data: { tasks }, errors }) => {
        console.log({ tasks, errors })

        if (errors)
          this.toastService.present({ variant: ToastType.ERROR, message: errors[0].message })
        if (tasks) return tasks
        return null
      })
    )
  }

  getTaskByIdQuery(id: string) {
    return this.apollo.query<TaskQuery>({
      errorPolicy: 'all',
      query: TaskDocument,
      variables: { id }
    })
  }

  getTaskById(id: string) {
    return this.getTaskByIdQuery(id).pipe(
      map(({ data: { task }, errors }) => {
        if (errors)
          this.toastService.present({ variant: ToastType.ERROR, message: errors[0].message })
        if (task) return task
        return null
      })
    )
  }

  createTaskMutation(task: TaskInput) {
    return this.apollo.mutate<CreateTaskMutation>({
      mutation: CreateTaskDocument,
      variables: { input: task }
    })
  }

  createTask(task: TaskInput) {
    return this.createTaskMutation(task).pipe(
      map(({ data, errors }) => {
        if (errors)
          this.toastService.present({ variant: ToastType.ERROR, message: errors[0].message })
        if (data) return data
        return null
      })
    )
  }
}
