import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotAddComponent } from './slot-add.component';

describe('SlotAddComponent', () => {
  let component: SlotAddComponent;
  let fixture: ComponentFixture<SlotAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
