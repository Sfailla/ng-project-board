import { ComponentFixture, TestBed } from '@angular/core/testing'
import { IonIconTitleDirective } from './icon-title.directive'
import { TestComponent } from '@testing/components'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

describe('IconTitleDirective', () => {
  let directive: DebugElement[]
  let fixture: ComponentFixture<TestComponent>

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [IonIconTitleDirective]
    }).createComponent(TestComponent)

    fixture.detectChanges()

    directive = fixture.debugElement.queryAll(By.directive(IonIconTitleDirective))
  })

  it('should create an instance', () => {
    expect(directive).toBeTruthy()
  })
})
