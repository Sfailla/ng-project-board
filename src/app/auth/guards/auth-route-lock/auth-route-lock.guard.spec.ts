import { ActivatedRoute, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { authRouteLockGuard } from './auth-route-lock.guard'
import { TestBed } from '@angular/core/testing'
import { AuthService } from '../../services'
import { Apollo } from 'apollo-angular'
import { Routes } from '../../../shared/types'

describe('AuthRouteLockGuard', () => {
  let authService: AuthService
  let router: Router
  let activatedRoute: ActivatedRoute

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {} } },
        { provide: Apollo, useValue: {} }
      ]
    }).compileComponents()

    authService = TestBed.inject(AuthService)
    router = TestBed.inject(Router)
    activatedRoute = TestBed.inject(ActivatedRoute)
  })
  it('should create', () => {
    expect(authRouteLockGuard).toBeTruthy()
  })

  it('should return true if the user is not authenticated', () => {
    jest.spyOn(authService, 'isAuthenticated').mockReturnValue(false)
    jest.spyOn(router, 'createUrlTree')

    const result = TestBed.runInInjectionContext(() => {
      return authRouteLockGuard(activatedRoute.snapshot, <RouterStateSnapshot>{})
    })

    expect(result).toBe(true)
    expect(authService.isAuthenticated).toHaveBeenCalled()
    expect(router.createUrlTree).not.toHaveBeenCalled()
  })

  it('should return a url tree if the user is authenticated', () => {
    jest.spyOn(authService, 'isAuthenticated').mockReturnValue(true)
    jest.spyOn(router, 'createUrlTree')

    const result = TestBed.runInInjectionContext(() => {
      return authRouteLockGuard(activatedRoute.snapshot, <RouterStateSnapshot>{})
    })

    expect(result).toBeInstanceOf(UrlTree)
    expect(authService.isAuthenticated).toHaveBeenCalled()
    expect(router.createUrlTree).toHaveBeenCalled()
    expect(router.createUrlTree).toHaveBeenCalledWith([Routes.DASHBOARD])
  })
})
