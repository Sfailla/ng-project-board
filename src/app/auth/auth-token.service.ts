import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'

const TOKEN_KEY = environment.authTokenKey
const USER_KEY = environment.authUserKey

@Injectable({
	providedIn: 'root'
})
export class AuthTokenService {
	constructor() {}

	destroyToken(): void {
		window.sessionStorage.clear()
	}

	public saveToken(token: string): void {
		window.sessionStorage.removeItem(TOKEN_KEY)
		window.sessionStorage.setItem(TOKEN_KEY, token)
	}

	public getToken(): string | null {
		return window.sessionStorage.getItem(TOKEN_KEY)
	}

	public saveUser(user: any): void {
		window.sessionStorage.removeItem(USER_KEY)
		window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
	}

	public getUser(): any {
		const user = window.sessionStorage.getItem(USER_KEY)
		return user ? JSON.parse(user) : {}
	}
}
