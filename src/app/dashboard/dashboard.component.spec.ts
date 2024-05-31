import { TestBed } from '@angular/core/testing'
import { DashboardComponent } from './dashboard.component'
import { setupTest } from '@testing/utils'
import { Apollo } from 'apollo-angular'
import { provideRouter } from '@angular/router'
import { AuthService } from '@auth/services'
import { AuthServiceMock, LocalStorageServiceMock } from '@testing/mocks/services'
import { LocalStorageService } from '@shared/services'
import { MockHomeComponent, MockTaskComponent } from '@testing/components'
import { Location } from '@angular/common'

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
    const navigateSpy = jest
      .spyOn(component.navController, 'navigateForward')
      .mockResolvedValue(true)

    component.handleNavigation()

    expect(navigateSpy).toHaveBeenCalledWith(['dashboard', 'home'])
  })

  it('should call navController navigate forward with dashboard/:id/board route if projectId is not null', async () => {
    const { component } = setupTest(DashboardComponent)
    const navigateSpy = jest
      .spyOn(component.navController, 'navigateForward')
      .mockResolvedValue(true)

    component.storage.setItem('project-id', '123')
    await component.handleNavigation()

    expect(navigateSpy).toHaveBeenCalledWith(['dashboard', '123', 'board'])
  })

  it('should route to the dashboard/home route if projectId is null', async () => {
    const { component, location } = setupTest(DashboardComponent, {
      additionalProviders: [{ name: 'location', value: Location }]
    })

    await component.ngOnInit()

    expect(location.path()).toBe('/dashboard/home')
  })

  it('should route to the dashboard/:id/board route if projectId is not null', async () => {
    const { fixture, component, location } = setupTest(DashboardComponent, {
      additionalProviders: [{ name: 'location', value: Location }]
    })

    component.storage.setItem('project-id', '123')
    fixture.detectChanges()
    await component.ngOnInit()

    expect(location.path()).toBe('/dashboard/123/board')
  })
})
