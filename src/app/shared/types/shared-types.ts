export enum ErrorMessages {
  JWT = '🚫⏱️ jwt expired',
  UNAUTHORIZED = '🚫🔐 Not authenticated',
  PASSWORDS_DO_NOT_MATCH = '🚫🔐 Passwords do not match',
  LOGIN_FAILED = '🚫🔐 Login failed',
  LOGOUT_FAILED = '🚫🔐 Logout failed',
  REGISTRATION_FAILED = '🚫🔐 Registration failed',
  SESSION_EXPIRED = '🚫⏱️ Your session has expired. Please login again'
}

export enum Messages {
  LOGIN_SUCCESSFUL = '🚀 Login successful',
  REGISTRATION_SUCCESSFUL = '🚀 Registration successful',
  LOGOUT_SUCCESSFUL = '🚀 Logout successful',
  PROJECT_CREATED = '🚀 Project created',
  PROJECT_DELETED = '🚀 Project deleted',
  PROJECT_UPDATED = '🚀 Project updated'
}

export enum ConfirmationHeader {
  DELETE_PROJECT = 'Delete Project',
  DELETE_TASK = 'Delete Task'
}

export enum ConfirmationMessage {
  DELETE_PROJECT = 'Are you sure you want to delete this project? Deleting this project will remove all associated tasks',
  DELETE_TASK = 'Are you sure you want to delete this task?'
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
  BOARD = '/dashboard/:id/board'
}

export enum IonicRoutes {
  DASHBOARD = 'dashboard',
  HOME = 'home',
  BOARD = 'board'
}

export enum ToastType {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning'
}
