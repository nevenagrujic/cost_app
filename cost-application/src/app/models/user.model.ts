import { Roles } from './roles.enum';

export class User {
  public id: Number;
  public firstName: String;
  public lastName: String;
  public identityCardNumber: Number;
  public email: String;
  public password: String;
  public roles: Array<Roles>;

  constructor(
    id: Number,
    firstName: String,
    lastName: String,
    identityCardNumber: Number,
    email: String,
    password: String,
    roles: Array<Roles>
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.identityCardNumber = identityCardNumber;
    this.email  = email;
    this.password = password;
    this.roles = roles || new Array();
  }
}
