export enum ErrorMessages {
  JWT = 'jwt expired',
  UNAUTHORIZED = 'Not authenticated',
  PASSWORDS_DO_NOT_MATCH = '⛔️🔐 Passwords do not match',
  LOGIN_FAILED = '⛔️🔐 Login failed',
  REGISTRATION_FAILED = '⛔️🔐 Registration failed'
}

export enum Messages {
  SESSION_EXPIRED = 'Your session has expired. Please login agian'
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
  DASHBOARD = '/dashboard'
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

export type ToastPosition = 'top' | 'bottom'
export type ToastVariant = 'error' | 'success' | 'info' | 'warning'
export type ToastAnimation = 'slide-out-right' | 'slide-out-left' | 'slide-up' | 'slide-down'
export type ToastConfig = { duration: number; position: ToastPosition; animation: ToastAnimation }
export type ToastInput = { variant: ToastVariant; message: string; config?: ToastConfig }
