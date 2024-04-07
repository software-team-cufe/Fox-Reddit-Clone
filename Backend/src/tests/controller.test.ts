// Import dependencies and controller functions
import { Request, Response } from 'express';
import {
  username_availableHandler,
  aboutHandler,
  submittedPostByUsrnameHandler,
  userOverviewHandler,
} from '../controller/user.controller';
import { findUserByUsername, findUserIdByUsername, findUserPosts } from '../service/user.service';
import { findUserComments } from '../service/comment.service';

// Mock the user service functions
jest.mock('../service/user.service', () => ({
  findUserByUsername: jest.fn(),
  findUserIdByUsername: jest.fn(),
  findUserPosts: jest.fn(),
}));

// Define a custom type for the request parameters
interface UsernameRequestParams {
  verificationCode: string;
  id: string;
  username: string;
}

// Helper function to create a mock request with query parameters
const createMockRequestWithQuery = (username: string): Partial<Request<UsernameRequestParams>> => ({
  query: { username },
});

// Helper function to create a mock request with params
const createMockRequestWithParams = (username: string): Partial<Request> => ({
  params: { username },
});

// Helper function to create a mock response object
const createMockResponse = (): Partial<Response> => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  send: jest.fn(),
});

describe('username_availableHandler', () => {
  it('should return "Not Available" if username is already taken', async () => {
    const mockReq = createMockRequestWithQuery('example_username');
    const mockRes = createMockResponse();

    (findUserByUsername as jest.Mock).mockResolvedValueOnce({});

    await username_availableHandler(mockReq as Request<UsernameRequestParams>, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith('Not Available');
  });

  it('should return "Available" if username is not taken', async () => {
    const mockReq = createMockRequestWithQuery('newUser');
    const mockRes = createMockResponse();

    (findUserByUsername as jest.Mock).mockResolvedValueOnce(null);

    await username_availableHandler(mockReq as Request<UsernameRequestParams>, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith('Available');
  });

  it('should handle errors and return 500 status', async () => {
    const mockReq = createMockRequestWithQuery('testUser');
    const mockRes = createMockResponse();

    (findUserByUsername as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    await username_availableHandler(mockReq as Request<UsernameRequestParams>, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Internal server error');
  });
});

describe('aboutHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should return user information if user exists', async () => {
    // Mock request and response objects
    const mockReq: Partial<Request<{ username: string }>> = {
      params: { username: 'example_username' },
    };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the behavior of findUserByUsername to return user data
    (findUserByUsername as jest.Mock).mockResolvedValueOnce({
      // Mock user data
    });

    // Call the controller function
    await aboutHandler(mockReq as Request<{ username: string }>, mockRes as Response);

    // Assert that response status and json are called appropriately
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(/* expected user information */);
  });

  it('should return 404 if user does not exist', async () => {
    // Mock request and response objects
    const mockReq: Partial<Request<{ username: string }>> = {
      params: { username: 'nonexistent_user' },
    };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock the behavior of findUserByUsername to return null (user not found)
    (findUserByUsername as jest.Mock).mockResolvedValueOnce(null);

    // Call the controller function
    await aboutHandler(mockReq as Request<{ username: string }>, mockRes as Response);

    // Assert that response status and send are called appropriately
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith("This user doesn't exist!");
  });

  it('should handle errors and return 500 status', async () => {
    // Mock request and response objects
    const mockReq: Partial<Request<{ username: string }>> = {
      params: { username: 'test_user' },
    };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock the behavior of findUserByUsername to throw an error
    (findUserByUsername as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    // Call the controller function
    await aboutHandler(mockReq as Request<{ username: string }>, mockRes as Response);

    // Assert that response status and send are called appropriately
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Internal server error');
  });
});

describe('submittedPostByUsrnameHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should return user posts by username', async () => {
    // Mock request and response objects
    const mockReq: Partial<Request<{ username: string }>> = {
      params: { username: 'example_username' },
      query: { sortBy: 'New' },
    };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the behavior of findUserIdByUsername to return a user ID
    (findUserIdByUsername as jest.Mock).mockResolvedValueOnce('user_id');

    // Mock the behavior of findUserPosts to return user posts
    (findUserPosts as jest.Mock).mockResolvedValueOnce([
      /* mock user posts */
    ]);

    // Call the controller function
    await submittedPostByUsrnameHandler(mockReq as Request<{ username: string }>, mockRes as Response);

    // Assert that response status and json are called appropriately
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([
      /* expected user posts */
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
    await submittedPostByUsrnameHandler(mockReq as Request<{ username: string }>, mockRes as Response);

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
    await submittedPostByUsrnameHandler(mockReq as Request<{ username: string }>, mockRes as Response);

    // Assert that response status and send are called appropriately
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('Invalid request');
  });
});

describe('userOverviewHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should return user posts and comments by username', async () => {
    // Mock request and response objects
    const mockReq: Partial<Request<{ username: string }>> = {
      params: { username: 'example_username' },
      query: { sortBy: 'New' },
    };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the behavior of findUserIdByUsername to return a user ID
    (findUserIdByUsername as jest.Mock).mockResolvedValueOnce('user_id');

    // Mock the behavior of findUserPosts and findUserComments to return user posts and comments
    (findUserPosts as jest.Mock).mockResolvedValueOnce([
      /* mock user posts */
    ]);
    (findUserComments as jest.Mock).mockResolvedValueOnce([
      /* mock user comments */
    ]);

    // Call the controller function
    await userOverviewHandler(mockReq as Request<{ username: string }>, mockRes as Response);

    // Assert that response status and json are called appropriately
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      retrievedPosts: [
        /* expected user posts */
      ],
      retrievedComments: [
        /* expected user comments */
      ],
    });
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
    await userOverviewHandler(mockReq as Request<{ username: string }>, mockRes as Response);

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
    await userOverviewHandler(mockReq as Request<{ username: string }>, mockRes as Response);

    // Assert that response status and send are called appropriately
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('Invalid request');
  });
});
