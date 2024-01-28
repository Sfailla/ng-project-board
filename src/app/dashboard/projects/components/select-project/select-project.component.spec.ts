import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProjectComponent } from './select-project.component';

describe('SelectProjectComponent', () => {
  let component: SelectProjectComponent;
  let fixture: ComponentFixture<SelectProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
