import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { CanActivateReturnType, Routes } from '../../../src/types'
import { AuthService } from './auth.service'

@Injectable({
	providedIn: 'root'
})
export class AuthProtectGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): CanActivateReturnType {
		return this.authService.isAuthenticated() ? this.router.createUrlTree([Routes.Dashboard]) : true
	}
}
