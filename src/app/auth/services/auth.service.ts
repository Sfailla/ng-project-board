import { Injectable, inject } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { CreateUserDocument, LoginDocument } from '../../../generated/mutations/index.graphql-gen'
import { AuthUserInput } from '../types'
import { map } from 'rxjs/internal/operators/map'
import { TokenService } from './token.service'
import { UserAndToken } from '../../../generated/types.graphql-gen'
import { Router } from '@angular/router'
import { NavController } from '@ionic/angular'

@Injectable({ providedIn: 'root' })
export class AuthService {
  apollo: Apollo = inject(Apollo)
  tokenService: TokenService = inject(TokenService)
  router: Router = inject(Router)
  navController: NavController = inject(NavController)

  register(authUserInput: AuthUserInput) {
    const { username, email, password, confirmPassword } = authUserInput

    if (password !== confirmPassword) {
      throw new Error('⛔️🔐 Passwords do not match')
    }

    return this.apollo
      .mutate({
        mutation: CreateUserDocument,
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
        variables: { email, password }
      })
      .pipe(
        map(async ({ data }) => {
          console.log({ data })
          if (!data) throw new Error('⛔️🔐 Login failed')

          this.tokenService.saveUserAndToken(data.login.user, data.login.token)
          await this.navController.navigateRoot(['/dashboard'], { animationDirection: 'forward' })
        })
      )
  }

  async logout() {
    this.tokenService.destroySession()
    await this.navController.navigateRoot(['/auth/login'], { animationDirection: 'back' })
  }

  isAuthenticated() {
    return !!this.tokenService.getToken()
  }
}
