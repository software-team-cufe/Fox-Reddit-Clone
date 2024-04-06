import { Request, Response } from 'express';
import { commentsByUsrnameHandler } from '../controller/comment.controller';
import { findUserComments, findUserIdByUsername } from '../service/comment.service';

jest.mock('../service/comment.service', () => ({
  findUserComments: jest.fn(),
  findUserIdByUsername: jest.fn(),
}));

describe('commentsByUsrnameHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should return user comments by username', async () => {
    // Mock request and response objects
    const mockReq: Partial<Request<{ username: string }>> = {
      params: { username: 'example_username' },
      query: { sortBy: 'New' },
    };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock the behavior of findUserIdByUsername to return a user ID
    (findUserIdByUsername as jest.Mock).mockResolvedValueOnce('user_id');

    // Mock the behavior of findUserComments to return user comments
    (findUserComments as jest.Mock).mockResolvedValueOnce([
      /* mock user comments */
    ]);

    // Call the controller function
    await commentsByUsrnameHandler(mockReq as Request<{ username: string }>, mockRes as Response);

    // Assert that response status and send are called appropriately
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith([
      /* expected user comments */
    ]);
  });

  it('should handle user not found', async () => {
    // Mock request and response objects
    const mockReq: Partial<Request<{ username: string }>> = {
      params: { username: 'non_existing_user' },
      query: { sortBy: 'New' },
    };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock the behavior of findUserIdByUsername to return null (user not found)
    (findUserIdByUsername as jest.Mock).mockResolvedValueOnce(null);

    // Call the controller function
    await commentsByUsrnameHandler(mockReq as Request<{ username: string }>, mockRes as Response);

    // Assert that response status and send are called appropriately
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith('User not found');
  });

  it('should handle invalid request', async () => {
    // Mock request and response objects with missing sortBy query parameter
    const mockReq: Partial<Request<{ username: string }>> = {
      params: { username: 'example_username' },
      query: {}, // sortBy is missing
    };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Call the controller function
    await commentsByUsrnameHandler(mockReq as Request<{ username: string }>, mockRes as Response);

    // Assert that response status and send are called appropriately
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('Invalid request');
  });
});
