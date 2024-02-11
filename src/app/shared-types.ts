export enum ErrorMessages {
  JWT = 'jwt expired',
  UNAUTHORIZED = 'Not authenticated',
  PASSWORDS_DO_NOT_MATCH = '⛔️🔐 Passwords do not match',
  LOGIN_FAILED = '⛔️🔐 Login failed'
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
