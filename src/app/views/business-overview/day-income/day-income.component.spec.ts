import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayIncomeComponent } from './day-income.component';

describe('DayIncomeComponent', () => {
  let component: DayIncomeComponent;
  let fixture: ComponentFixture<DayIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
