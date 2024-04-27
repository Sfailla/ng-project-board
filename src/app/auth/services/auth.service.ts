import { Injectable, effect, inject, signal } from '@angular/core'
import { Apollo } from 'apollo-angular'
import {
  CreateUserDocument,
  CreateUserMutation,
  LoginDocument,
  LoginMutation
} from '@generated/mutations'
import { AuthUserInput } from '../auth-types'
import { map } from 'rxjs/internal/operators/map'
import { TokenService } from './token.service'
import { User } from '@generated/types'
import { Router } from '@angular/router'
import { NavController } from '@ionic/angular/standalone'
import { ErrorMessages, Messages, Routes } from '@shared/types'
import { LogoutDocument, LogoutQuery } from '@generated/queries'
import { ToastService } from '@shared/services'

@Injectable({ providedIn: 'root' })
export class AuthService {
  apollo: Apollo = inject(Apollo)
  router: Router = inject(Router)
  tokenService: TokenService = inject(TokenService)
  navController: NavController = inject(NavController)
  toastService: ToastService = inject(ToastService)

  currentUser = signal<User | null>(null)

  constructor() {
    effect(() => {
      console.log('CURRENT_USER:', { user: this.currentUser() })
    })
  }

  setCurrentUser() {
    const user = this.tokenService.getUser()
    this.currentUser.set(user)
  }

  getCurrentUser() {
    return this.currentUser()
  }

  registerMutation(authUserInput: AuthUserInput) {
    const { username, email, password } = authUserInput

    return this.apollo.mutate<CreateUserMutation>({
      errorPolicy: 'all',
      mutation: CreateUserDocument,
      variables: { username, email, password }
    })
  }

  register(authUserInput: AuthUserInput) {
    const { password, confirmPassword } = authUserInput

    if (password !== confirmPassword) {
      this.toastService.present({ variant: 'error', message: ErrorMessages.PASSWORDS_DO_NOT_MATCH })
      throw new Error(ErrorMessages.PASSWORDS_DO_NOT_MATCH)
    }

    return this.registerMutation(authUserInput).pipe(
      map(async ({ data, errors }) => {
        if (errors) this.toastService.present({ variant: 'error', message: errors[0].message })

        if (data?.createUser) {
          this.toastService.present({
            variant: 'success',
            message: Messages.REGISTRATION_SUCCESSFUL
          })

          this.currentUser.set(data.createUser.user)

          await this.apollo.client.resetStore()
          await this.tokenService.saveUserAndToken(data?.createUser.user, data?.createUser.token)
          await this.navController.navigateRoot([Routes.DASHBOARD], {
            animationDirection: 'forward'
          })
        }
      })
    )
  }

  loginMutation(authUserInput: AuthUserInput) {
    const { email, password } = authUserInput

    return this.apollo.mutate<LoginMutation>({
      errorPolicy: 'all',
      mutation: LoginDocument,
      variables: { email, password }
    })
  }

  login(authUserInput: AuthUserInput) {
    return this.loginMutation(authUserInput).pipe(
      map(async ({ data, errors }) => {
        if (errors) this.toastService.present({ variant: 'error', message: errors[0].message })

        if (data?.login) {
          this.toastService.present({
            variant: 'success',
            message: Messages.LOGIN_SUCCESSFUL
          })

          this.currentUser.set(data.login.user)

          await this.apollo.client.resetStore()
          await this.tokenService.saveUserAndToken(data.login.user, data.login.token)
          await this.navController.navigateRoot([Routes.DASHBOARD], {
            animationDirection: 'forward'
          })
        }
      })
    )
  }

  logoutQuery() {
    return this.apollo.query<LogoutQuery>({ query: LogoutDocument, errorPolicy: 'all' })
  }

  logout() {
    return this.logoutQuery().pipe(
      map(async ({ data: { logout }, error }) => {
        if (error) this.toastService.present({ variant: 'error', message: error.message })

        if (logout) {
          this.tokenService.destroySession()
          this.currentUser.set(null)
          await this.navController.navigateRoot([Routes.LOGIN], {
            animationDirection: 'back'
          })
        }
      })
    )
  }

  isAuthenticated() {
    return !!this.tokenService.getToken()
  }
}
