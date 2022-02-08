import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionsDialogComponent } from './user-actions-dialog.component';

describe('UserActionsDialogComponent', () => {
  let component: UserActionsDialogComponent;
  let fixture: ComponentFixture<UserActionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActionsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
