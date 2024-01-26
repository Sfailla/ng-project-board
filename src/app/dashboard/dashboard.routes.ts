import { authGuard } from '../auth/guards/auth.guard'
import { DashboardComponent } from './dashboard.component'

export const DASHBOARD_ROUTES = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard]
    // children: [
    //   {
    //     path: 'home',
    //     loadChildren: () => import('../home/home-routes').then(m => m.HOME_ROUTES)
    //   },
    //   {
    //     path: ':id/tasks',
    //     loadChildren: () => import('../tasks/task-routes').then(m => m.TASK_ROUTES)
    //   },
    //   {
    //     path: 'projects',
    //     loadChildren: () => import('../projects/project-routes').then(m => m.PROJECT_ROUTES)
    //   }
    //   // {
    //   // 	path: 'settings',
    //   // 	loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
    //   // },
    // ]
  }
]
