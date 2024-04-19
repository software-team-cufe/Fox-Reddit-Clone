// Import dependencies and controller functions
// import { NextFunction, Request, Response } from 'express';
// import {
//   username_availableHandler,
//   aboutHandler,
//   getUserCommentsHandler,
//   getUserOverview,
//   getUserSubmittedHandler,
// } from '../controller/user.controller';
// import { findUserByUsername, userSubmittedPosts, userCommentsIds, userRepliesIds } from '../service/user.service';
// import userCommets from '../service/comment.service';
// import userPosts from '../service/post.service';
// // Mock the user service functions
// jest.mock('../service/user.service', () => ({
//   findUserByUsername: jest.fn(),
//   findUserIdByUsername: jest.fn(),
//   findUserPosts: jest.fn(),
// }));

// // Define a custom type for the request parameters
// interface UsernameRequestParams {
//   verificationCode: string;
//   id: string;
//   username: string;
// }

// // Helper function to create a mock request with query parameters
// const createMockRequestWithQuery = (username: string): Partial<Request<UsernameRequestParams>> => ({
//   query: { username },
// });

// // Helper function to create a mock request with params

// // Helper function to create a mock response object
// const createMockResponse = (): Partial<Response> => ({
//   status: jest.fn().mockReturnThis(),
//   json: jest.fn(),
//   send: jest.fn(),
// });

// describe('username_availableHandler', () => {
//   it('should return "Not Available" if username is already taken', async () => {
//     const mockReq = createMockRequestWithQuery('example_username');
//     const mockRes = createMockResponse();

//     (findUserByUsername as jest.Mock).mockResolvedValueOnce({});

//     await username_availableHandler(mockReq as Request<UsernameRequestParams>, mockRes as Response);

//     expect(mockRes.status).toHaveBeenCalledWith(200);
//     expect(mockRes.json).toHaveBeenCalledWith('Not Available');
//   });

//   it('should return "Available" if username is not taken', async () => {
//     const mockReq = createMockRequestWithQuery('newUser');
//     const mockRes = createMockResponse();

//     (findUserByUsername as jest.Mock).mockResolvedValueOnce(null);

//     await username_availableHandler(mockReq as Request<UsernameRequestParams>, mockRes as Response);

//     expect(mockRes.status).toHaveBeenCalledWith(200);
//     expect(mockRes.json).toHaveBeenCalledWith('Available');
//   });

//   it('should handle errors and return 500 status', async () => {
//     const mockReq = createMockRequestWithQuery('testUser');
//     const mockRes = createMockResponse();

//     (findUserByUsername as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

//     await username_availableHandler(mockReq as Request<UsernameRequestParams>, mockRes as Response);

//     expect(mockRes.status).toHaveBeenCalledWith(500);
//     expect(mockRes.send).toHaveBeenCalledWith('Internal server error');
//   });
// });

// describe('aboutHandler', () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Clear mocks before each test
//   });

//   it('should return user information if user exists', async () => {
//     // Mock request and response objects
//     const mockReq: Partial<Request<{ username: string }>> = {
//       params: { username: 'example_username' },
//     };
//     const mockRes: Partial<Response> = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     // Mock the behavior of findUserByUsername to return user data
//     (findUserByUsername as jest.Mock).mockResolvedValueOnce({
//       // Mock user data
//     });

//     // Call the controller function
//     await aboutHandler(mockReq as Request<{ username: string }>, mockRes as Response);

//     // Assert that response status and json are called appropriately
//     expect(mockRes.status).toHaveBeenCalledWith(200);
//     expect(mockRes.json).toHaveBeenCalledWith(/* expected user information */);
//   });

//   it('should return 404 if user does not exist', async () => {
//     // Mock request and response objects
//     const mockReq: Partial<Request<{ username: string }>> = {
//       params: { username: 'nonexistent_user' },
//     };
//     const mockRes: Partial<Response> = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     };

//     // Mock the behavior of findUserByUsername to return null (user not found)
//     (findUserByUsername as jest.Mock).mockResolvedValueOnce(null);

//     // Call the controller function
//     await aboutHandler(mockReq as Request<{ username: string }>, mockRes as Response);

//     // Assert that response status and send are called appropriately
//     expect(mockRes.status).toHaveBeenCalledWith(404);
//     expect(mockRes.send).toHaveBeenCalledWith("This user doesn't exist!");
//   });

//   it('should handle errors and return 500 status', async () => {
//     // Mock request and response objects
//     const mockReq: Partial<Request<{ username: string }>> = {
//       params: { username: 'test_user' },
//     };
//     const mockRes: Partial<Response> = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     };

//     // Mock the behavior of findUserByUsername to throw an error
//     (findUserByUsername as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

//     // Call the controller function
//     await aboutHandler(mockReq as Request<{ username: string }>, mockRes as Response);

//     // Assert that response status and send are called appropriately
//     expect(mockRes.status).toHaveBeenCalledWith(500);
//     expect(mockRes.send).toHaveBeenCalledWith('Internal server error');
//   });
// });

// jest.mock('../service/user.service', () => ({
//   userSubmittedPosts: jest.fn(),
//   userPosts: jest.fn(),
// }));
// describe('getUserSubmittedHandler', () => {
//   let mockRequest: Partial<Request>;
//   let mockResponse: Partial<Response>;
//   let mockNext: jest.Mock<NextFunction>;

//   beforeEach(() => {
//     mockRequest = {
//       params: { username: 'testUser' },
//       query: { limit: '10' },
//     };
//     mockResponse = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//     mockNext = jest.fn();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should return 400 error if limit parameter is missing', async () => {
//     // Arrange
//     if (mockRequest.query) {
//       delete mockRequest.query.limit;
//     }

//     // Act
//     await getUserSubmittedHandler(mockRequest as Request, mockResponse as Response, mockNext);

//     // Assert
//     expect(mockResponse.status).toHaveBeenCalledWith(400);
//     expect(mockResponse.json).toHaveBeenCalledWith({
//       error: 'Invalid request. Limit parameter is missing or invalid.',
//     });
//     expect(userSubmittedPosts).not.toHaveBeenCalled();
//     expect(userPosts).not.toHaveBeenCalled();
//     expect(mockNext).not.toHaveBeenCalled();
//   });

//   it('should return 400 error if limit parameter is invalid', async () => {
//     // Arrange
//     if (mockRequest.query) {
//       mockRequest.query.limit = 'invalidLimit';
//     }
//     // Act
//     await getUserSubmittedHandler(mockRequest as Request, mockResponse as Response, mockNext);

//     // Assert
//     expect(mockResponse.status).toHaveBeenCalledWith(400);
//     expect(mockResponse.json).toHaveBeenCalledWith({
//       error: 'Invalid request. Limit parameter is missing or invalid.',
//     });
//     expect(userSubmittedPosts).not.toHaveBeenCalled();
//     expect(userPosts).not.toHaveBeenCalled();
//     expect(mockNext).not.toHaveBeenCalled();
//   });

//   it('should call userSubmittedPosts and userPosts functions and return posts', async () => {
//     // Arrange
//     const mockPostIds = ['postId1', 'postId2'];
//     const mockPosts = [{}, {}];
//     (userSubmittedPosts as jest.Mock).mockResolvedValueOnce(mockPostIds);
//     (userPosts as jest.Mock).mockResolvedValueOnce(mockPosts);

//     // Act
//     await getUserSubmittedHandler(mockRequest as Request, mockResponse as Response, mockNext);

//     // Assert
//     expect(userSubmittedPosts).toHaveBeenCalledWith('testUser');
//     expect(userPosts).toHaveBeenCalledWith(mockPostIds, 10);
//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(mockResponse.json).toHaveBeenCalledWith({ posts: mockPosts });
//     expect(mockNext).not.toHaveBeenCalled();
//   });

//   it('should call next function if an error occurs', async () => {
//     // Arrange
//     const mockError = new Error('Test error');
//     (userSubmittedPosts as jest.Mock).mockRejectedValueOnce(mockError);

//     // Act
//     await getUserSubmittedHandler(mockRequest as Request, mockResponse as Response, mockNext);

//     // Assert
//     expect(mockNext).toHaveBeenCalledWith(mockError);
//     expect(mockResponse.status).not.toHaveBeenCalled();
//     expect(mockResponse.json).not.toHaveBeenCalled();
//     expect(userPosts).not.toHaveBeenCalled();
//   });
// });

// describe('getUserCommentsHandler', () => {
//   let mockRequest: Partial<Request>;
//   let mockResponse: Partial<Response>;
//   let mockNext: NextFunction;

//   beforeEach(() => {
//     // Initialize mock objects
//     mockRequest = {
//       params: { username: 'testUser' },
//       query: { limit: '10' }, // Example query with limit parameter
//     };
//     mockResponse = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//     mockNext = jest.fn();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should return 400 error if limit parameter is missing', async () => {
//     // Arrange
//     delete mockRequest.query?.limit;

//     // Act
//     await getUserCommentsHandler(mockRequest as Request, mockResponse as Response, mockNext);

//     // Assert
//     expect(mockResponse.status).toHaveBeenCalledWith(400);
//     expect(mockResponse.json).toHaveBeenCalledWith({
//       error: 'Invalid request. Limit parameter is missing or invalid.',
//     });
//     expect(userCommentsIds).not.toHaveBeenCalled();
//     expect(userCommets).not.toHaveBeenCalled();
//     expect(mockNext).not.toHaveBeenCalled();
//   });

//   it('should return 400 error if limit parameter is invalid', async () => {
//     // Arrange
//     mockRequest.query!.limit = 'invalidLimit';

//     // Act
//     await getUserCommentsHandler(mockRequest as Request, mockResponse as Response, mockNext);

//     // Assert
//     expect(mockResponse.status).toHaveBeenCalledWith(400);
//     expect(mockResponse.json).toHaveBeenCalledWith({
//       error: 'Invalid request. Limit parameter is missing or invalid.',
//     });
//     expect(userCommentsIds).not.toHaveBeenCalled();
//     expect(userCommets).not.toHaveBeenCalled();
//     expect(mockNext).not.toHaveBeenCalled();
//   });

//   it('should return comments if request is valid', async () => {
//     // Arrange
//     const expectedComments = [
//       { id: '1', text: 'Comment 1' },
//       { id: '2', text: 'Comment 2' },
//     ];
//     (userCommentsIds as jest.Mock).mockResolvedValueOnce(['1', '2']);
//     (userCommets as jest.Mock).mockResolvedValueOnce(expectedComments);

//     // Act
//     await getUserCommentsHandler(mockRequest as Request, mockResponse as Response, mockNext);

//     // Assert
//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(mockResponse.json).toHaveBeenCalledWith({ comments: expectedComments });
//     expect(userCommentsIds).toHaveBeenCalledWith('testUser');
//     expect(userCommets).toHaveBeenCalledWith(['1', '2'], 10);
//     expect(mockNext).not.toHaveBeenCalled();
//   });

//   it('should handle errors and call next middleware', async () => {
//     // Arrange
//     const expectedError = new Error('Database error');
//     (userCommentsIds as jest.Mock).mockRejectedValueOnce(expectedError);

//     // Act
//     await getUserCommentsHandler(mockRequest as Request, mockResponse as Response, mockNext);

//     // Assert
//     expect(mockResponse.status).not.toHaveBeenCalled();
//     expect(mockResponse.json).not.toHaveBeenCalled();
//     expect(mockNext).toHaveBeenCalledWith(expectedError);
//   });
// });
// describe('getUserOverview', () => {
//   let mockRequest: Partial<Request>;
//   let mockResponse: Partial<Response>;
//   let mockNext: NextFunction;

//   beforeEach(() => {
//     // Initialize mock objects
//     mockRequest = {
//       params: { username: 'testUser' },
//       query: { limit: '10' }, // Example query with limit parameter
//     };
//     mockResponse = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//     mockNext = jest.fn();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should return 400 error if limit parameter is missing', async () => {
//     // Arrange
//     delete mockRequest.query?.limit;

//     // Act
//     await getUserOverview(mockRequest as Request, mockResponse as Response, mockNext);

//     // Assert
//     expect(mockResponse.status).toHaveBeenCalledWith(400);
//     expect(mockResponse.json).toHaveBeenCalledWith({
//       error: 'Invalid request. Limit parameter is missing or invalid.',
//     });
//     expect(userSubmittedPosts).not.toHaveBeenCalled();
//     expect(userCommentsIds).not.toHaveBeenCalled();
//     expect(userRepliesIds).not.toHaveBeenCalled();
//     expect(userCommets).not.toHaveBeenCalled();
//     expect(mockNext).not.toHaveBeenCalled();
//   });

//   it('should return 400 error if limit parameter is invalid', async () => {
//     // Arrange
//     mockRequest.query!.limit = 'invalidLimit';

//     // Act
//     await getUserOverview(mockRequest as Request, mockResponse as Response, mockNext);

//     // Assert
//     expect(mockResponse.status).toHaveBeenCalledWith(400);
//     expect(mockResponse.json).toHaveBeenCalledWith({
//       error: 'Invalid request. Limit parameter is missing or invalid.',
//     });
//     expect(userSubmittedPosts).not.toHaveBeenCalled();
//     expect(userCommentsIds).not.toHaveBeenCalled();
//     expect(userRepliesIds).not.toHaveBeenCalled();
//     expect(userCommets).not.toHaveBeenCalled();
//     expect(mockNext).not.toHaveBeenCalled();
//   });

//   it('should return user overview if request is valid', async () => {
//     // Arrange
//     const expectedPosts = [
//       { id: '1', text: 'Post 1' },
//       { id: '2', text: 'Post 2' },
//     ];
//     const expectedComments = [
//       { id: '1', text: 'Comment 1' },
//       { id: '2', text: 'Comment 2' },
//     ];
//     const expectedReplies = [
//       { id: '1', text: 'Reply 1' },
//       { id: '2', text: 'Reply 2' },
//     ];
//     (userSubmittedPosts as jest.Mock).mockResolvedValueOnce(['1', '2']);
//     (userCommentsIds as jest.Mock).mockResolvedValueOnce(['1', '2']);
//     (userRepliesIds as jest.Mock).mockResolvedValueOnce(['1', '2']);
//     (userCommets as jest.Mock).mockResolvedValueOnce(expectedPosts);
//     (userCommets as jest.Mock).mockResolvedValueOnce(expectedComments);
//     (userCommets as jest.Mock).mockResolvedValueOnce(expectedReplies);

//     // Act
//     await getUserOverview(mockRequest as Request, mockResponse as Response, mockNext);

//     // Assert
//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(mockResponse.json).toHaveBeenCalledWith({
//       posts: expectedPosts,
//       comments: expectedComments,
//       replies: expectedReplies,
//     });
//     expect(userSubmittedPosts).toHaveBeenCalledWith('testUser');
//     expect(userCommentsIds).toHaveBeenCalledWith('testUser');
//     expect(userRepliesIds).toHaveBeenCalledWith('testUser');
//     expect(userCommets).toHaveBeenCalledWith(['1', '2'], 10);
//     expect(userCommets).toHaveBeenCalledWith(['1', '2'], 10);
//     expect(userCommets).toHaveBeenCalledWith(['1', '2'], 10);
//     expect(mockNext).not.toHaveBeenCalled();
//   });

//   it('should handle errors and call next middleware', async () => {
//     // Arrange
//     const expectedError = new Error('Database error');
//     (userSubmittedPosts as jest.Mock).mockRejectedValueOnce(expectedError);

//     // Act
//     await getUserOverview(mockRequest as Request, mockResponse as Response, mockNext);

//     // Assert
//     expect(mockResponse.status).not.toHaveBeenCalled();
//     expect(mockResponse.json).not.toHaveBeenCalled();
//     expect(mockNext).toHaveBeenCalledWith(expectedError);
//   });
// });
