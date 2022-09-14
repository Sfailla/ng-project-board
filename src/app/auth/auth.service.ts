import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AuthService {
	isLoggedIn$ = new BehaviorSubject<boolean>(true)

	constructor() {}

	isLoggedIn() {
		return this.isLoggedIn$.asObservable()
	}
}
