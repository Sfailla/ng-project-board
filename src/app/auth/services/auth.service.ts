import { Injectable, inject } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { CreateUserDocument, LoginDocument } from '../../../generated/mutations/index.graphql-gen'
import { AuthUserInput } from '../types'
import { map } from 'rxjs/internal/operators/map'

@Injectable({ providedIn: 'root' })
export class AuthService {
  apollo: Apollo = inject(Apollo)

  register(authUserInput: AuthUserInput) {
    const { username, email, password, confirmPassword } = authUserInput

    if (password !== confirmPassword) {
      throw new Error('⛔️🔐 Passwords do not match')
    }

    this.apollo
      .mutate({
        mutation: CreateUserDocument,
        variables: { username, email, password }
      })
      .pipe(
        map(({ data }) => {
          console.log({ data })
        })
      )
  }

  login(authUserInput: AuthUserInput) {
    const { email, password } = authUserInput

    console.log({ email, password })

    this.apollo
      .mutate({
        mutation: LoginDocument,
        variables: { email, password },
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(({ data }) => {
          console.log({ data })
        })
      )
  }
}
