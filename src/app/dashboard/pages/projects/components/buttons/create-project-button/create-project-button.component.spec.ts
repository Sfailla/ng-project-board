import { TestBed } from '@angular/core/testing'
import { CreateProjectButtonComponent } from './create-project-button.component'
import { findNativeElement, setupTest } from '@testing/utils'
import { Router, provideRouter } from '@angular/router'

describe('CreateProjectButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProjectButtonComponent],
      providers: [
        provideRouter([
          { path: 'dashboard/projects/create', component: CreateProjectButtonComponent }
        ])
      ]
    }).compileComponents()
  })

  it('should create', () => {
    const { component } = setupTest(CreateProjectButtonComponent)
    expect(component).toBeTruthy()
  })

  it('should route to create-project on button click', async () => {
    const { fixture, router } = setupTest(CreateProjectButtonComponent, {
      additionalProviders: [{ name: 'router', value: Router }]
    })

    const button = findNativeElement(fixture, 'a')
    button.click()

    expect(router.url).toBe('/dashboard/projects/create')
  })
})
