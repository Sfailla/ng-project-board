import { authGuard } from '../auth/guards'
import { DashboardComponent } from './dashboard.component'

export const DASHBOARD_ROUTES = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.routes').then(m => m.HOME_ROUTES)
      },
      {
        path: ':id/board',
        loadChildren: () => import('./pages/board/board.routes').then(m => m.BOARD_ROUTES)
      },
      {
        path: 'projects',
        loadChildren: () => import('./pages/projects/project.routes').then(m => m.PROJECT_ROUTES)
      }
    ]
  }
]
