import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseActionsDialogComponent } from './expense-actions-dialog.component';

describe('ExpenseActionsDialogComponent', () => {
  let component: ExpenseActionsDialogComponent;
  let fixture: ComponentFixture<ExpenseActionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseActionsDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseActionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
