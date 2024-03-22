import UserModel, { User } from '../model/user.model';

/**
 * Creates a new user.
 *
 * @param input - The user data to create.
 * @returns A promise that resolves to the created user.
 */
export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}

/**
 * Finds a user by their ID.
 *
 * @param id - The ID of the user to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
export function findUserById(id: string) {
  return UserModel.findById(id);
}

/**
 * Finds a user by their email address.
 *
 * @param email - The email address of the user to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}
/**
 * Finds a user by their username.
 *
 * @param username - The username of the user to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
export function findUserByUsername(username: string) {
  return UserModel.findOne({ username });
}
