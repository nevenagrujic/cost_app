import { Time } from '@angular/common';

export class Expense {
  public id: Number;
  public date: Date;
  public time: Time;
  public description: String;
  public amount: Number;
  public comment: String;
  public userId: Number;

  constructor(
    id: Number,
    date: Date,
    time: Time,
    description: String,
    amount: Number,
    comment: String,
    userId: Number
  ) {
    this.id = id;
    this.date = date || new Date();
    this.time = time;
    this.description = description;
    this.amount = amount;
    this.comment = comment;
    this.userId = userId;
  }
}
