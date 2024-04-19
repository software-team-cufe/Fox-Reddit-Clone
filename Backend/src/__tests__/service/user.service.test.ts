import { createUser } from '../../service/user.service';
import { UserModel } from '../../model/user.model';

jest.mock('../model/user.model');

describe('createUser', () => {
  it('should throw error if user creation fails', async () => {
    const error = new Error('User creation failed');
    (UserModel.create as jest.Mock).mockRejectedValueOnce(error);

    await expect(createUser({})).rejects.toThrow(error);
  });

  it('should trim whitespace from input fields', async () => {
    const input = {
      username: ' test_user ',
      email: ' test@example.com ',
      password: ' password123 ',
    };

    const expected = {
      username: 'test_user',
      email: 'test@example.com',
      password: 'password123',
    };

    (UserModel.create as jest.Mock).mockResolvedValueOnce(expected);

    const result = await createUser(input);

    expect(UserModel.create).toHaveBeenCalledWith(expected);
    expect(result).toEqual(expected);
  });

  it('should handle empty input', async () => {
    await expect(createUser({})).rejects.toThrow('Input is empty');
  });
});
