import { Injectable } from '@angular/core'
import { Apollo, MutationResult } from 'apollo-angular'
import { BehaviorSubject, map, shareReplay } from 'rxjs'
import { User, UserWithToken } from 'src/generated/graphql'
import { AuthTokenService } from './auth-token.service'
import { ApolloQueryResult } from '@apollo/client/core/types'
import { Router } from '@angular/router'
import { Me, Routes } from 'src/types'
import { LoginDocument as loginMutation, MeDocument as meQuery } from 'src/generated/graphql'

@Injectable({ providedIn: 'root' })
export class AuthService {
	isLoggedIn$ = new BehaviorSubject<boolean>(false)
	currentUser$ = new BehaviorSubject<User | null>(null)

	constructor(
		private apollo: Apollo,
		private tokenService: AuthTokenService,
		private router: Router
	) {}

	isLoggedIn() {
		return this.isLoggedIn$.asObservable()
	}

	getCurrentUser() {
		return this.currentUser$.asObservable()
	}

	async login(email: string, password: string): Promise<void> {
		this.apollo
			.mutate<UserWithToken>({
				mutation: loginMutation,
				fetchPolicy: 'no-cache',
				variables: { email, password }
			})
			.subscribe(({ data, loading }: MutationResult) => {
				const { user, token } = data?.login
				console.log({ data, loading })

				this.isLoggedIn$.next(true)
				this.currentUser$.next(user)
				this.tokenService.saveToken(token)
				this.tokenService.saveUser(user)

				this.router.navigate([Routes.Dashboard])
			}),
			shareReplay(1)
	}

	getCurrentSession() {
		this.apollo
			.watchQuery<Me>({
				query: meQuery,
				fetchPolicy: 'no-cache'
			})
			.valueChanges.subscribe(({ data, loading }: ApolloQueryResult<Me>) => {
				const { me } = data
				console.log({ data, loading })

				if (me) {
					this.currentUser$.next(me)
					this.isLoggedIn$.next(true)
				}

				return me
			}),
			shareReplay(1)
	}
}
