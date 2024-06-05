import { TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { PageWrapperComponent } from './page-wrapper.component'
import { findElement, findNativeElement, getNativeElementText, setupTest } from '@testing/utils'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageWrapperComponent],
      providers: [provideRouter([])]
    }).compileComponents()
  })

  it('should create the app', () => {
    const { component } = setupTest(PageWrapperComponent)
    expect(component).toBeTruthy()
  })

  it('should display h2 element if title input is preset', () => {
    const { fixture } = setupTest(PageWrapperComponent, { setInput: { title: 'Test Title' } })
    const titleElement = findNativeElement(fixture, 'h2')
    const titleElementText = getNativeElementText(fixture, 'h2')

    expect(titleElement).toBeTruthy()
    expect(titleElementText).toMatch(/test title/i)
  })

  it('should not display h2 element if title input is not preset', () => {
    const { fixture } = setupTest(PageWrapperComponent)
    const titleElement = findElement(fixture, 'h2')

    expect(titleElement).toBeFalsy()
  })
})
