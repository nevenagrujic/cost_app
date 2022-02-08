import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { ExpenseActionsDialogComponent } from './expenses/actions-dialog/expense-actions-dialog.component';
import { UserActionsDialogComponent } from './users/actions-dialog/user-actions-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export const routes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: 'expenses',
    component: ExpensesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  // {
  //     path: ':id',
  //     component: CourseComponent,
  //     resolve: {
  //         course: CourseResolver
  //     }
  // }
];

@NgModule({
  declarations: [
    UsersComponent,
    ExpensesComponent,
    ExpenseActionsDialogComponent,
    UserActionsDialogComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule.forChild(routes),
  ],
  exports: [UsersComponent, ExpensesComponent],
  entryComponents: [
    UserActionsDialogComponent,
    ExpenseActionsDialogComponent,
    HomeComponent,
  ],
  providers: [AuthGuard],
})
export class ModulesModule {}
