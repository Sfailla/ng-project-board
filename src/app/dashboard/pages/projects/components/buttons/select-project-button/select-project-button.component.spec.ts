import { TestBed } from '@angular/core/testing'
import { SelectProjectButtonComponent } from './select-project-button.component'
import { findNativeElement, setupTest } from '@testing/utils'
import { Router, provideRouter } from '@angular/router'
import { BoardComponent } from '../../../../board/board.component'
import { Apollo } from 'apollo-angular'

describe('SelectProjectButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectProjectButtonComponent],
      providers: [
        Apollo,
        provideRouter([{ path: 'dashboard/:id/board', component: BoardComponent }])
      ]
    }).compileComponents()
  })

  it('should create', () => {
    const { component } = setupTest(SelectProjectButtonComponent, {
      setInput: { project: { id: '1234' } }
    })
    expect(component).toBeTruthy()
  })

  it('should route to board with project id on button click', () => {
    const { fixture, component, router } = setupTest(SelectProjectButtonComponent, {
      setInput: { project: { id: '1234' } },
      additionalProviders: [{ name: 'router', value: Router }]
    })
    const button = findNativeElement(fixture, '.select-project')
    button.click()

    expect(router.url).toBe(`/dashboard/${component.project().id}/board`)
  })

  it('should call setCurrentProjectId on button click', () => {
    const { fixture, component } = setupTest(SelectProjectButtonComponent, {
      setInput: { project: { id: '1234' } }
    })
    const button = findNativeElement(fixture, '.select-project')
    const setCurrentProjectIdSpy = jest.spyOn(component, 'setCurrentProjectId')
    button.click()

    expect(setCurrentProjectIdSpy).toHaveBeenCalledTimes(1)
    expect(setCurrentProjectIdSpy).toHaveBeenCalledWith(component.project().id)
  })

  it('should call projectDetails on button click', () => {
    const { fixture, component } = setupTest(SelectProjectButtonComponent, {
      setInput: { project: { id: '1234' } }
    })
    const button = findNativeElement(fixture, '.project-icon-container span:first-child')
    const projectDetailsSpy = jest.spyOn(component, 'projectDetails')
    button.click()

    expect(projectDetailsSpy).toHaveBeenCalledTimes(1)
    expect(projectDetailsSpy).toHaveBeenCalledWith(expect.anything(), component.project())
  })

  it('should call deleteProject on button click', () => {
    const { fixture, component } = setupTest(SelectProjectButtonComponent, {
      setInput: { project: { id: '1234' } }
    })
    const button = findNativeElement(fixture, '.project-icon-container span:last-child')
    const deleteProjectSpy = jest.spyOn(component, 'deleteProject')
    button.click()

    expect(deleteProjectSpy).toHaveBeenCalledTimes(1)
    expect(deleteProjectSpy).toHaveBeenCalledWith(expect.anything(), component.project().id)
  })
})
