import {
  createUser,
  findUserById,
  findUserByEmail,
  findUserByUsername,
  findUserIdByUsername,
  userSubmittedPosts,
} from '../../service/user.service';
import { UserModel } from '../../model/user.model';

jest.mock('../../model/user.model');
jest.setTimeout(10000);
describe('createUser', () => {
  it('should throw error if user creation fails', async () => {
    const error = new Error('User creation failed');
    (UserModel.create as jest.Mock).mockRejectedValueOnce(error);

    await expect(createUser({})).rejects.toThrow(error);
  });

  it('should create a new user', async () => {
    const mockUser = {
      username: 'sharifehabelmasryyyyd',
      email: '7bc5f4a3cc@emailbbox.prso',
      password: 'sharifo12344',
      passwordConfirmation: 'sharifo12344',
    };
    (UserModel.create as jest.Mock).mockResolvedValueOnce(mockUser);
  });
});

describe('findUserById', () => {
  it('should return the user object if user is found', async () => {
    const mockUser = {
      id: '123',
      name: 'John Doe',
    };
    jest.spyOn(UserModel, 'findById').mockResolvedValueOnce(mockUser);

    const foundUser = await findUserById('123');
    expect(foundUser).toEqual(mockUser);
  });

  it('should return null if user is not found', async () => {
    jest.spyOn(UserModel, 'findById').mockResolvedValueOnce(null);

    const foundUser = await findUserById('456');
    expect(foundUser).toBeNull();
  });

  it('should reject with error if findById throws', async () => {
    const error = new Error('Find error');
    jest.spyOn(UserModel, 'findById').mockRejectedValueOnce(error);

    await expect(findUserById('123')).rejects.toThrow(error);
  });
});

describe('findUserByEmail', () => {
  it('should return the user object if user is found', async () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
    };

    jest.spyOn(UserModel, 'findOne').mockResolvedValueOnce(mockUser);

    const foundUser = await findUserByEmail('test@example.com');
    expect(foundUser).toEqual(mockUser);
  });

  it('should return null if user is not found', async () => {
    jest.spyOn(UserModel, 'findOne').mockResolvedValueOnce(null);

    const foundUser = await findUserByEmail('nonexisting@email.com');
    expect(foundUser).toBeNull();
  });

  it('should reject with error if findOne throws', async () => {
    const error = new Error('Find error');
    jest.spyOn(UserModel, 'findOne').mockRejectedValueOnce(error);

    await expect(findUserByEmail('test@example.com')).rejects.toThrow(error);
  });
});

describe('findUserByUsername', () => {
  it('should return the user object if user is found', async () => {
    const mockUser = {
      username: 'testuser',
      name: 'Test User',
    };

    jest.spyOn(UserModel, 'findOne').mockResolvedValueOnce(mockUser);

    const foundUser = await findUserByUsername('testuser');
    expect(foundUser).toEqual(mockUser);
  });

  it('should return null if user is not found', async () => {
    jest.spyOn(UserModel, 'findOne').mockResolvedValueOnce(null);

    const foundUser = await findUserByUsername('nonexistentuser');
    expect(foundUser).toBeNull();
  });

  it('should reject with 404 error if findOne throws', async () => {
    const error = new Error('Find error');
    jest.spyOn(UserModel, 'findOne').mockRejectedValueOnce(error);

    await expect(findUserByUsername('testuser')).rejects.toThrow('User not found');
  });
});
