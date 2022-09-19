import { Injectable } from '@angular/core'
import { Apollo, MutationResult } from 'apollo-angular'
import { BehaviorSubject, map, shareReplay } from 'rxjs'
import { User, UserWithToken } from 'src/generated/types.graphql-gen'
import { AuthTokenService } from './auth-token.service'
import { ApolloQueryResult } from '@apollo/client/core/types'
import { Router } from '@angular/router'
import { Me, Routes } from 'src/types'
import { MeDocument as meQuery } from 'src/generated/queries/index.graphql-gen'
import {
	LoginDocument as loginMutation,
	RegisterDocument as registerMutation
} from 'src/generated/mutations/index.graphql-gen'

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

	getCurrentSession() {
		if (!this.isAuthenticated()) {
			return
		}

		this.apollo
			.watchQuery<Me>({
				query: meQuery,
				fetchPolicy: 'network-only'
			})
			.valueChanges.subscribe(({ data }: ApolloQueryResult<Me>) => {
				const { me } = data

				this.currentUser$.next(me)
				this.tokenService.saveUser(me)
			}),
			shareReplay(1)
	}

	async register(
		username: string,
		email: string,
		password: string,
		confirmPassword: string
	): Promise<void> {
		if (password !== confirmPassword) {
			throw new Error('🔐 Passwords do not match')
		}

		this.apollo
			.mutate<UserWithToken>({
				mutation: registerMutation,
				fetchPolicy: 'network-only',
				variables: { username, email, password }
			})
			.subscribe(({ data }: MutationResult) => {
				const { user, token } = data?.register

				this.currentUser$.next(user)
				this.tokenService.saveToken(token)
				this.tokenService.saveUser(user)

				this.router.navigate([Routes.Dashboard])
			}),
			shareReplay(1)
	}

	async login(email: string, password: string): Promise<void> {
		this.apollo
			.mutate<UserWithToken>({
				mutation: loginMutation,
				fetchPolicy: 'network-only',
				variables: { email, password }
			})
			.subscribe(({ data }: MutationResult) => {
				const { user, token } = data?.login

				this.currentUser$.next(user)
				this.tokenService.saveToken(token)
				this.tokenService.saveUser(user)

				this.router.navigate([Routes.Dashboard])
			}),
			shareReplay(1)
	}

	logout() {
		this.tokenService.destroySession()
		this.currentUser$.next(null)
		this.apollo.client.resetStore()
		this.router.navigate([Routes.Login])
	}
}
