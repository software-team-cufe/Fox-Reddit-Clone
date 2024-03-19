import UserModel, { User } from '../model/user.model';

export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}
