import { Injectable, inject } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { CreateUserDocument, LoginDocument } from '../../../generated/mutations/index.graphql-gen'
import { AuthUserInput } from '../auth-types'
import { map } from 'rxjs/internal/operators/map'
import { TokenService } from './token.service'
import { UserAndToken } from '../../../generated/types.graphql-gen'
import { Router } from '@angular/router'
import { NavController } from '@ionic/angular'
import { ErrorMessages, Routes } from '../../shared-types'
import { LogoutDocument } from '../../../generated/queries/index.graphql-gen'
import { ToastService } from '../../shared/services/toast/toast.service'

@Injectable({ providedIn: 'root' })
export class AuthService {
  apollo: Apollo = inject(Apollo)
  router: Router = inject(Router)
  tokenService: TokenService = inject(TokenService)
  navController: NavController = inject(NavController)
  toastService: ToastService = inject(ToastService)

  register(authUserInput: AuthUserInput) {
    const { username, email, password, confirmPassword } = authUserInput

    if (password !== confirmPassword) {
      throw new Error(ErrorMessages.PASSWORDS_DO_NOT_MATCH)
    }

    return this.apollo
      .mutate<{ createUser: UserAndToken }>({
        mutation: CreateUserDocument,
        variables: { username, email, password }
      })
      .pipe(
        map(async ({ data, errors }) => {
          console.log({ data, errors })

          if (errors) {
            this.toastService.setToastMessage({ variant: 'error', message: errors[0].message })
            await this.navController.navigateRoot([Routes.REGISTER], {
              animationDirection: 'back'
            })
          }

          if (!data) throw new Error(ErrorMessages.REGISTRATION_FAILED)

          await this.apollo.client.resetStore()
          await this.tokenService.saveUserAndToken(data?.createUser.user, data?.createUser.token)
          await this.navController.navigateRoot([Routes.DASHBOARD], {
            animationDirection: 'forward'
          })

          return data
        })
      )
  }

  login(authUserInput: AuthUserInput) {
    const { email, password } = authUserInput

    return this.apollo
      .mutate<{ login: UserAndToken }>({
        mutation: LoginDocument,
        errorPolicy: 'all',
        variables: { email, password }
      })
      .pipe(
        map(async ({ data, errors }) => {
          console.log({ data, errors })
          if (errors) {
            this.toastService.setToastMessage({ variant: 'error', message: errors[0].message })
            await this.navController.navigateRoot([Routes.LOGIN], {
              animationDirection: 'back'
            })
          }

          if (!data) throw new Error(ErrorMessages.LOGIN_FAILED)

          await this.apollo.client.resetStore()
          await this.tokenService.saveUserAndToken(data.login.user, data.login.token)
          await this.navController.navigateRoot([Routes.DASHBOARD], {
            animationDirection: 'forward'
          })

          return data
        })
      )
  }

  logout() {
    return this.apollo.query({ query: LogoutDocument }).pipe(
      map(async ({ data, error }) => {
        if (error) console.error({ error })
        if (!data) throw new Error('Logout failed')

        this.tokenService.destroySession()
        await this.apollo.client.resetStore()
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
