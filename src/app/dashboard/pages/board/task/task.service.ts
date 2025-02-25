import { Injectable, inject } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { TaskDocument, TaskQuery, TasksDocument, TasksQuery } from '@generated/queries'
import {
  CreateTaskDocument,
  CreateTaskMutation,
  UpdateTaskDocument,
  UpdateTaskMutation,
  UpdateTaskOrderAndPositionDocument,
  UpdateTaskOrderAndPositionMutation
} from '@generated/mutations'
import { OrderAndPositionInput, TaskInput } from '@generated/types'
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
        if (errors)
          this.toastService.present({ variant: ToastType.ERROR, message: errors[0].message })
        if (tasks) return tasks
        return []
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

  createTaskMutation(input: TaskInput) {
    return this.apollo.mutate<CreateTaskMutation>({
      mutation: CreateTaskDocument,
      variables: { input }
    })
  }

  createTask(input: TaskInput) {
    return this.createTaskMutation(input).pipe(
      map(({ data, errors }) => {
        if (errors)
          this.toastService.present({ variant: ToastType.ERROR, message: errors[0].message })
        if (data) return data
        return null
      })
    )
  }

  updateTaskMutation(input: TaskInput) {
    return this.apollo.mutate<UpdateTaskMutation>({
      mutation: UpdateTaskDocument,
      variables: { input }
    })
  }

  updateTask(input: TaskInput) {
    return this.updateTaskMutation(input).pipe(
      map(({ data, errors }) => {
        if (errors)
          this.toastService.present({ variant: ToastType.ERROR, message: errors[0].message })
        if (data) return data
        return null
      })
    )
  }

  updateTaskOrderAndPositionMutation(input: OrderAndPositionInput) {
    return this.apollo.mutate<UpdateTaskOrderAndPositionMutation>({
      mutation: UpdateTaskOrderAndPositionDocument,
      variables: { input }
    })
  }

  updateTaskOrderAndPosition(input: OrderAndPositionInput) {
    return this.updateTaskOrderAndPositionMutation(input).pipe(
      map(({ data, errors }) => {
        if (errors)
          this.toastService.present({ variant: ToastType.ERROR, message: errors[0].message })
        if (data) return data
        return null
      })
    )
  }
}
