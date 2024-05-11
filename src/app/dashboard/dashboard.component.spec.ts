import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DashboardComponent } from './dashboard.component'
import { debug } from '../../testing/utils'
import { Apollo } from 'apollo-angular'
import { provideRouter } from '@angular/router'

describe('DashboardComponent', () => {
  let component: DashboardComponent
  let fixture: ComponentFixture<DashboardComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [Apollo, provideRouter([])]
    }).compileComponents()
    fixture = TestBed.createComponent(DashboardComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    debug(fixture)
    expect(component).toBeTruthy()
  })
})
