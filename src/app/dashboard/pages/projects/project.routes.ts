import { Routes } from '@angular/router'
import { CreateProjectComponent } from './components/create-project/create-project.component'
import { ProjectsComponent } from './projects.component'
import { SelectProjectComponent } from './components/select-project/select-project.component'

export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    component: ProjectsComponent
  },
  {
    path: 'create',
    component: CreateProjectComponent
  },
  {
    path: 'select',
    component: SelectProjectComponent
  }
]
