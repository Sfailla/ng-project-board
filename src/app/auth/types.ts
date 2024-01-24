export enum AuthTitles {
  LOGIN = 'Sign Into',
  REGISTER = 'Sign Up For'
}

export enum RedirectTitles {
  SIGN_IN = 'Sign In',
  SIGN_UP = 'Sign Up'
}

export interface AuthUserInput {
  username?: string
  email: string
  password: string
  confirmPassword?: string
}
