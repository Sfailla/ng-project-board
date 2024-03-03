export enum ErrorMessages {
  JWT = 'jwt expired',
  UNAUTHORIZED = 'Not authenticated',
  PASSWORDS_DO_NOT_MATCH = '⛔️🔐 Passwords do not match',
  LOGIN_FAILED = '⛔️🔐 Login failed',
  REGISTRATION_FAILED = '⛔️🔐 Registration failed',
  SESSION_EXPIRED = 'Your session has expired. Please login again'
}

export enum Messages {
  LOGIN_SUCCESSFUL = '🎉🔐 Login successful',
  REGISTRATION_SUCCESSFUL = '🎉🔐 Registration successful',
  LOGOUT_SUCCESSFUL = '🎉🔐 Logout successful'
}

export enum LocalStorageKeys {
  AUTH_TOKEN = 'auth-token',
  AUTH_USER = 'auth-user',
  PROJECT_ID = 'project-id',
  MENU_EXPANDED = 'is-menu-expanded'
}

export enum Routes {
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
  DASHBOARD = '/dashboard',
  HOME = '/dashboard/home',
  PROJECTS = '/dashboard/projects',
  CREATE_PROJECT = '/dashboard/projects/create',
  TASKS = '/dashboard/:id/tasks'
}

export enum IonicRoutes {
  DASHBOARD = 'dashboard',
  HOME = 'home',
  TASKS = 'tasks'
}

export enum ToastTypes {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning'
}

export type ToastPosition = 'top' | 'bottom' | 'left' | 'right'
export type ToastVariant = 'error' | 'success' | 'info' | 'warning'
export type ToastAnimation = 'slide-out-right' | 'slide-out-left' | 'slide-up' | 'slide-down'
export type ToastConfig = { duration: number; position: ToastPosition; animation: ToastAnimation }
export type ToastInput = { variant: ToastVariant; message: string; config?: ToastConfig }
