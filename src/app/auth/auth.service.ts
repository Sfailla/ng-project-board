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
	currentUser$ = new BehaviorSubject<User | null>(null)

	constructor(
		private apollo: Apollo,
		private tokenService: AuthTokenService,
		private router: Router
	) {}

	isAuthenticated() {
		return !!this.tokenService.getToken()
	}

	getCurrentUser() {
		return this.currentUser$.value
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

				this.currentUser$.next(user)
				this.tokenService.saveToken(token)

				this.router.navigate([Routes.Dashboard])
			}),
			shareReplay(1)
	}

	getCurrentSession() {
		if (!this.isAuthenticated()) {
			return
		}

		this.apollo
			.watchQuery<Me>({
				query: meQuery,
				fetchPolicy: 'no-cache'
			})
			.valueChanges.subscribe(({ data }: ApolloQueryResult<Me>) => {
				const { me } = data

				this.currentUser$.next(me)
			}),
			shareReplay(1)
	}
}
