import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Expense } from 'src/app/models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const expense = new Expense(0, new Date(), undefined, "Expense for food", 130.30, "", 1);
    const expenses = [expense, new Expense(1, new Date(), undefined, "Expense for food", 130.30, "", 1)];
    return {
      users: [
        {
          id: 1,
          firstName: 'Nevena',
          lastName: 'Grujic',
          identityCardNumber: 123,
          password: "123",
          email: "nevena.grujic25@gmail.com",
          roles: ['BASIC', 'ADMIN']
        },
        {
          id: 2,
          firstName: 'Marija',
          lastName: 'Grujic',
          identityCardNumber: 123,
          password: "123",
          email: "marija.grujic@gmail.com",
          roles: ['BASIC', 'ADMIN']
        },
        {
          id: 3,
          firstName: 'Stefan',
          lastName: 'Stefanovic',
          identityCardNumber: 123,
          password: "123",
          email: "stefan.stefanovic@gmail.com",
          roles: ['BASIC', 'ADMIN']
        }
      ], expenses: expenses
    };
  }
}
