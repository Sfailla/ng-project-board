import { TestBed } from '@angular/core/testing'
import { DashboardComponent } from './dashboard.component'
import { setupTest } from '@testing/utils'
import { Apollo } from 'apollo-angular'
import { provideRouter } from '@angular/router'
import { AuthService } from '@auth/services'
import { AuthServiceMock, LocalStorageServiceMock } from '@testing/mocks/services'
import { LocalStorageService } from '@shared/services'
import { RouterTestingHarness } from '@angular/router/testing'
import { MockHomeComponent, MockTaskComponent } from '@testing/components'
import { Location } from '@angular/common'
import { NgZone } from '@angular/core'

describe('DashboardComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        Apollo,
        provideRouter([
          { path: 'dashboard/home', component: MockHomeComponent },
          { path: 'dashboard/:id/board', component: MockTaskComponent }
        ]),
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: LocalStorageService, useClass: LocalStorageServiceMock }
      ]
    }).compileComponents()
  })

  it('should create', () => {
    const { component } = setupTest(DashboardComponent)
    expect(component).toBeTruthy()
  })

  it('should call navController navigate forward with dashboard/home route if projectId is null', () => {
    const { component } = setupTest(DashboardComponent)
    const navigateSpy = jest.spyOn(component.navController, 'navigateForward')
    component.handleNavigation()
    expect(navigateSpy).toHaveBeenCalledWith(['dashboard', 'home'])
  })

  it('should call navController navigate forward with dashboard/:id/board route if projectId is not null', () => {
    const { component } = setupTest(DashboardComponent)
    component.storage.setItem('project-id', '123')
    const navigateSpy = jest.spyOn(component.navController, 'navigateForward')
    component.handleNavigation()
    expect(navigateSpy).toHaveBeenCalledWith(['dashboard', '123', 'board'])
  })

  it('should route to the dashboard/home route if projectId is null', async () => {
    const { component, location, ngZone } = setupTest(DashboardComponent, {
      additionalProviders: [
        { name: 'location', value: Location },
        { name: 'ngZone', value: NgZone }
      ]
    })

    ngZone.run(async () => {
      await RouterTestingHarness.create('/dashboard/home')
      component.handleNavigation()
      expect(location.path()).toBe('/dashboard/home')
    })
  })

  it('should route to the dashboard/:id/board route if projectId is not null', async () => {
    const { component, location, ngZone } = setupTest(DashboardComponent, {
      additionalProviders: [
        { name: 'location', value: Location },
        { name: 'ngZone', value: NgZone }
      ]
    })

    component.storage.setItem('project-id', '123')

    ngZone.run(async () => {
      await RouterTestingHarness.create('/dashboard/123/board')
      component.handleNavigation()
      expect(location.path()).toBe('/dashboard/123/board')
    })
  })
})
