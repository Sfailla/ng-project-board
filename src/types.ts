import { UrlTree } from '@angular/router'
import { Observable } from 'rxjs'

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
