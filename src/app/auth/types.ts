export enum AuthTitles {
  LOGIN = 'Sign Into',
  REGISTER = 'Sign Up For'
}

export interface AuthUserInput {
  username?: string
  email: string
  password: string
  confirmPassword?: string
}
