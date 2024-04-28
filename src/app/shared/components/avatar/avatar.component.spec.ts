import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AvatarComponent } from './avatar.component'
import { User } from '@generated/types'

const mockUser: User = {
  id: 'faijfejhfaojh4894',
  username: 'testUser',
  email: 'testUser@gmail.com'
}

describe('AvatarComponent', () => {
  let component: AvatarComponent
  let fixture: ComponentFixture<AvatarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(AvatarComponent)
    fixture.componentRef.setInput('user', mockUser)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
