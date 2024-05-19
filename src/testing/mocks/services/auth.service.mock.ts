import { Injectable } from '@angular/core'
import { AuthService } from '@auth/services'
import { CreateUserMutation, LoginMutation } from '@generated/mutations'
import { mockLoginResponseWithData, mockRegisterResponseWithData, mockUser } from '../data'
import { Observable } from 'rxjs/internal/Observable'
import { of } from 'rxjs/internal/observable/of'
import { MutationResult } from 'apollo-angular/types'
import { map } from 'rxjs/internal/operators/map'

@Injectable({ providedIn: 'root' })
export class AuthServiceMock extends AuthService {
  constructor() {
    super()
  }

  override setCurrentUser(): void {
    this.currentUser.set(mockUser)
  }

  override logCurrentUser(): void {
    return
  }

  override isAuthenticated(authenticated: boolean = true): boolean {
    return authenticated
  }

  override loginMutation(): Observable<MutationResult<LoginMutation>> {
    return of(mockLoginResponseWithData)
  }

  override login(): Observable<Promise<void>> {
    return this.loginMutation().pipe(
      map(async ({ data, errors, loading }) => {
        if (!data) return
        if (errors) console.log(errors)
        if (data) this.currentUser.set(data.login.user)
        if (loading) console.log('loading...')
      })
    )
  }

  override registerMutation(): Observable<MutationResult<CreateUserMutation>> {
    return of(mockRegisterResponseWithData)
  }

  override register(): Observable<Promise<void>> {
    return this.registerMutation().pipe(
      map(async ({ data, errors, loading }) => {
        if (!data) return
        if (errors) console.log(errors)
        if (data) this.currentUser.set(data.createUser.user)
        if (loading) console.log('loading...')
      })
    )
  }
}
