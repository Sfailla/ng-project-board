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
        loadChildren: () => import('./home/home.routes').then(m => m.HOME_ROUTES)
      },
      {
        path: ':id/board',
        loadChildren: () => import('./board/board.routes').then(m => m.BOARD_ROUTES)
      },
      {
        path: 'projects',
        loadChildren: () => import('./projects/project.routes').then(m => m.PROJECT_ROUTES)
      }
      //   // {
      //   // 	path: 'settings',
      //   // 	loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      //   // },
    ]
  }
]
