import { TestBed } from '@angular/core/testing'
import { AvatarComponent } from './avatar.component'
import { mockUser } from '@testing/mocks/data'
import { findNativeElement, setupTest } from '@testing/utils'

function createComponent() {
  const { fixture, component } = setupTest(AvatarComponent, { setInput: { user: mockUser } })
  return { fixture, component }
}

describe('AvatarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent]
    }).compileComponents()
  })

  it('should create', () => {
    const { component } = createComponent()
    expect(component).toBeTruthy()
  })

  it('should display the user initials', () => {
    const { fixture } = createComponent()
    const avatarInitials = findNativeElement(fixture, '.avatar__initials')
    expect(avatarInitials.textContent).toBe('SF')
  })
})
