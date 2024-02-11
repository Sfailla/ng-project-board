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

@Injectable({ providedIn: 'root' })
export class AuthService {
  apollo: Apollo = inject(Apollo)
  router: Router = inject(Router)
  tokenService: TokenService = inject(TokenService)
  navController: NavController = inject(NavController)

  register(authUserInput: AuthUserInput) {
    const { username, email, password, confirmPassword } = authUserInput

    if (password !== confirmPassword) {
      throw new Error(ErrorMessages.PASSWORDS_DO_NOT_MATCH)
    }

    return this.apollo
      .mutate({
        mutation: CreateUserDocument,
        fetchPolicy: 'network-only',
        variables: { username, email, password }
      })
      .pipe(
        map(({ data }) => {
          console.log({ data })
          return data
        })
      )
  }

  login(authUserInput: AuthUserInput) {
    const { email, password } = authUserInput

    return this.apollo
      .mutate<{ login: UserAndToken }>({
        mutation: LoginDocument,
        fetchPolicy: 'network-only',
        variables: { email, password }
      })
      .pipe(
        map(async ({ data }) => {
          console.log({ data })
          if (!data) throw new Error(ErrorMessages.LOGIN_FAILED)

          this.apollo.client.resetStore()
          this.tokenService.saveUserAndToken(data.login.user, data.login.token)
          await this.navController.navigateRoot([Routes.DASHBOARD], {
            animationDirection: 'forward'
          })
        })
      )
  }

  async logout() {
    this.tokenService.destroySession()
    await this.navController.navigateRoot([Routes.LOGIN], { animationDirection: 'back' })
  }

  isAuthenticated() {
    return !!this.tokenService.getToken()
  }
}
