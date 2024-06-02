import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TaskComponent } from './task.component'
import { Task } from '@generated/types'

const mockTask: Task = {
  id: 'fjaijamneqn-dnafnfe-dajje343',
  title: 'Task 1',
  description: 'Description 1',
  status: 'open',
  assignee: null,
  displayOrder: 1,
  startDate: new Date(),
  endDate: new Date(),
  user: { id: 'raiqhroi234', username: 'User 1', email: 'testUser@gmail.com' },
  project: {
    id: 'fq9rqqajkfn',
    name: 'Project 1',
    categories: [],
    user: { id: 'raiqhroi234', username: 'User 1', email: 'testUser@gmail.com' }
  },
  category: { id: 'eoafnklenq', name: 'Category 1', displayOrder: 1, status: 'open' },
  tags: [],
  createdAt: new Date(),
  updatedAt: new Date()
}

describe('TaskComponent', () => {
  let component: TaskComponent
  let fixture: ComponentFixture<TaskComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(TaskComponent)
    fixture.componentRef.setInput('task', mockTask)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
