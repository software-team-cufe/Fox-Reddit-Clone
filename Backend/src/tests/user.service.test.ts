import { User } from '../model/user.model';
import { createUser } from '../service/user.service'; // Update the path

// Mocking UserModel methods for testing
class MockUserModel {
  static create = jest.fn();
  save = jest.fn();
}

describe('createUser', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  // Mocking UserModel by using import
  beforeAll(async () => {
    const { UserModel: MockedUserModel } = await import('../model/user.model'); // Update the path
    jest.mock('../path/to/UserModel', () => ({
      __esModule: true,
      UserModel: MockUserModel,
    }));
  });

  it('should create a new user with valid input', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    const mockCreatedUser = { id: '1', ...userData }; // Mock the created user

    // Mock UserModel.create to resolve with mockCreatedUser
    (MockUserModel.create as jest.Mock).mockResolvedValueOnce(mockCreatedUser);

    // Call createUser with the test data
    const createdUser = await createUser(userData);

    // Check if UserModel.create was called with the correct data
    expect(MockUserModel.create).toHaveBeenCalledWith(userData);

    // Check if the returned user matches the expected user
    expect(createdUser).toEqual(mockCreatedUser);
  });

  it('should throw an error if input is incomplete', async () => {
    // Providing a valid Partial<User> object with only 'name' property
    const incompleteData: Partial<User> = { username: 'Jane Doe', email: 'jane@example.com' };

    // Call createUser with incomplete data
    await expect(createUser(incompleteData)).rejects.toThrow();

    // Ensure UserModel.create was not called
    expect(MockUserModel.create).not.toHaveBeenCalled();
  });

  it('should handle errors from UserModel.create', async () => {
    const userData = { name: 'Test User', email: 'test@example.com' };
    const error = new Error('Database error');

    // Mock UserModel.create to reject with an error
    (MockUserModel.create as jest.Mock).mockRejectedValueOnce(error);

    // Call createUser with the test data
    await expect(createUser(userData)).rejects.toThrowError('Database error');

    // Check if UserModel.create was called with the correct data
    expect(MockUserModel.create).toHaveBeenCalledWith(userData);
  });
});
