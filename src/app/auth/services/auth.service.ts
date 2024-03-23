import { Injectable, inject } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { CreateUserDocument, LoginDocument } from '@generated/mutations'
import { AuthUserInput } from '../auth-types'
import { map } from 'rxjs/internal/operators/map'
import { TokenService } from './token.service'
import { UserAndToken } from '@generated/types'
import { Router } from '@angular/router'
import { NavController } from '@ionic/angular'
import { ErrorMessages, Messages, Routes } from '@shared/types'
import { LogoutDocument } from '@generated/queries'
import { ToastService } from '@shared/services'

@Injectable({ providedIn: 'root' })
export class AuthService {
  apollo: Apollo = inject(Apollo)
  router: Router = inject(Router)
  tokenService: TokenService = inject(TokenService)
  navController: NavController = inject(NavController)
  toastService: ToastService = inject(ToastService)

  registerMutation(authUserInput: AuthUserInput) {
    const { username, email, password } = authUserInput

    return this.apollo.mutate<{ createUser: UserAndToken }>({
      mutation: CreateUserDocument,
      errorPolicy: 'all',
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
        if (errors) {
          this.toastService.present({ variant: 'error', message: errors[0].message })
          await this.navController.navigateRoot([Routes.REGISTER], {
            animationDirection: 'back'
          })
        }

        if (!data) {
          this.toastService.present({
            variant: 'error',
            message: ErrorMessages.REGISTRATION_FAILED
          })
          throw new Error(ErrorMessages.REGISTRATION_FAILED)
        }

        this.toastService.present({
          variant: 'success',
          message: Messages.REGISTRATION_SUCCESSFUL
        })

        await this.apollo.client.resetStore()
        await this.tokenService.saveUserAndToken(data?.createUser.user, data?.createUser.token)
        await this.navController.navigateRoot([Routes.DASHBOARD], {
          animationDirection: 'forward'
        })

        return data
      })
    )
  }

  loginMutation(authUserInput: AuthUserInput) {
    const { email, password } = authUserInput

    return this.apollo.mutate<{ login: UserAndToken }>({
      mutation: LoginDocument,
      errorPolicy: 'all',
      variables: { email, password }
    })
  }

  login(authUserInput: AuthUserInput) {
    return this.loginMutation(authUserInput).pipe(
      map(async ({ data, errors }) => {
        if (errors) {
          this.toastService.present({ variant: 'error', message: errors[0].message })
          await this.navController.navigateRoot([Routes.LOGIN], {
            animationDirection: 'back'
          })
        }

        if (!data) {
          this.toastService.present({
            variant: 'error',
            message: ErrorMessages.LOGIN_FAILED
          })
          throw new Error(ErrorMessages.LOGIN_FAILED)
        }

        this.toastService.present({
          variant: 'success',
          message: Messages.LOGIN_SUCCESSFUL
        })

        await this.apollo.client.resetStore()
        await this.tokenService.saveUserAndToken(data.login.user, data.login.token)
        await this.navController.navigateRoot([Routes.DASHBOARD], {
          animationDirection: 'forward'
        })

        return data
      })
    )
  }

  logoutQuery() {
    return this.apollo.query({ query: LogoutDocument })
  }

  logout() {
    return this.logoutQuery().pipe(
      map(async ({ data, error }) => {
        if (error) {
          this.toastService.present({ variant: 'error', message: error.message })
          throw new Error(error.message)
        }
        if (!data) {
          this.toastService.present({ variant: 'error', message: ErrorMessages.LOGOUT_FAILED })
          throw new Error(ErrorMessages.LOGOUT_FAILED)
        }

        this.tokenService.destroySession()
        await this.navController.navigateRoot([Routes.LOGIN], {
          animationDirection: 'back'
        })
      })
    )
  }

  isAuthenticated() {
    return !!this.tokenService.getToken()
  }
}
