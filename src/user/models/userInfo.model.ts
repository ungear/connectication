import { User } from '../user.entity';

export class UserInfo {
  userId: number;
  firstName: string;
  lastName: string;

  constructor(user: User) {
    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
