import { Roles } from '../models/roles.enum';
import { User } from '../models/user.model';

export default class Utils {
  public static isAdmin(user: User): boolean {
    if (user != undefined && user.roles != undefined) {
      for (const role of user.roles) {
        if (role === Roles.ADMIN) {
          return true;
        }
      }
    }
    return false;
  }

  public static isLoggedUser(user: User, id: Number): boolean {
    if (user != undefined && user.id == id) {
      return true;
    }
    return false;
  }

  public static isLoggedUserDeleted(users: Array<User>, id: Number): boolean {
    if ((users && id) != undefined) {
      for (const user of users) {
        if (user.id == id) {
          return false;
        }
      }
    }
    return true;
  }

  public static isLoggedUserEdited(
    users: Array<User>,
    loggedInUser: User
  ): User {
    if ((users && loggedInUser) != undefined) {
      for (const user of users) {
        if (user.id == loggedInUser.id) {
          return user;
        }
      }
    }
    return undefined;
  }
}
