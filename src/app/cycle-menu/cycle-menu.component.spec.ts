import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleMenuComponent } from './cycle-menu.component';

describe('CycleMenuComponent', () => {
  let component: CycleMenuComponent;
  let fixture: ComponentFixture<CycleMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
