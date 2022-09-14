import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { map, take } from 'rxjs'
import { CanActivateReturnType } from '../../../src/types'
import { AuthService } from './auth.service'

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): CanActivateReturnType {
		return this.authService.isLoggedIn().pipe(
			take(1),
			map((isLoggedIn: boolean) => {
				return isLoggedIn || this.router.createUrlTree(['/auth/login'])
			})
		)
	}
}
