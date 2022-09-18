import { UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { User } from './generated/graphql'

export enum Routes {
	Login = 'auth/login',
	Register = 'auth/register',
	Dashboard = 'dashboard'
}

export type CanActivateReturnType =
	| Observable<boolean | UrlTree>
	| Promise<boolean | UrlTree>
	| boolean
	| UrlTree

export type Me = {
	me: User
}
