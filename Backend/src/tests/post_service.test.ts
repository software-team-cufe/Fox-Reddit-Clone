// // post_service.test.ts
// import userPosts from '../service/post.service';
// import PostModel, { Post } from '../model/posts.model';

// jest.mock('../model/posts.model', () => ({
//   find: jest.fn(),
// }));

// describe('userPosts', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should fetch posts with provided postIDs', async () => {
//     // Arrange
//     const mockPostIDs = ['postID1', 'postID2'];
//     const mockLimit = 10;
//     const expectedPosts: Partial<Post>[] = [
//       { userID: 'userID1', title: 'Title 1', textHTML: 'Text 1', textJSON: 'Text JSON 1' },
//       { userID: 'userID2', title: 'Title 2', textHTML: 'Text 2', textJSON: 'Text JSON 2' },
//     ];
//     (PostModel.find as jest.Mock).mockResolvedValueOnce(expectedPosts as Post[]);

//     // Act
//     const result = await userPosts(mockPostIDs, mockLimit);

//     // Assert
//     expect(PostModel.find).toHaveBeenCalledWith({ _id: { $in: mockPostIDs } });
//     expect(result).toEqual(expectedPosts);
//   });

//   it('should limit the number of fetched posts to the provided limit', async () => {
//     // Arrange
//     const mockPostIDs = ['postID1', 'postID2'];
//     const mockLimit = 5;
//     const expectedPosts: Partial<Post>[] = [
//       { userID: 'userID1', title: 'Title 1', textHTML: 'Text 1', textJSON: 'Text JSON 1' },
//       { userID: 'userID2', title: 'Title 2', textHTML: 'Text 2', textJSON: 'Text JSON 2' },
//     ];
//     const mockFindResult = { limit: jest.fn().mockResolvedValueOnce(expectedPosts as Post[]) };
//     (PostModel.find as jest.Mock).mockReturnValueOnce(mockFindResult);

//     // Act
//     await userPosts(mockPostIDs, mockLimit);

//     // Assert
//     expect(PostModel.find).toHaveBeenCalledWith({ _id: { $in: mockPostIDs } });
//     expect(mockFindResult.limit).toHaveBeenCalledWith(mockLimit);
//   });

//   it('should default to limit of 10 if limit is not provided', async () => {
//     // Arrange
//     const mockPostIDs = ['postID1', 'postID2'];
//     const expectedPosts: Partial<Post>[] = [
//       { userID: 'userID1', title: 'Title 1', textHTML: 'Text 1', textJSON: 'Text JSON 1' },
//       { userID: 'userID2', title: 'Title 2', textHTML: 'Text 2', textJSON: 'Text JSON 2' },
//     ];
//     const mockFindResult = { limit: jest.fn().mockResolvedValueOnce(expectedPosts as Post[]) };
//     (PostModel.find as jest.Mock).mockReturnValueOnce(mockFindResult);

//     // Act
//     await userPosts(mockPostIDs, 10);

//     // Assert
//     expect(PostModel.find).toHaveBeenCalledWith({ _id: { $in: mockPostIDs } });
//     expect(mockFindResult.limit).toHaveBeenCalledWith(10);
//   });
// });

// userPosts.test.ts

// import userPosts from '../service/post.service'; // Adjust the path to your actual function
// import PostModel from '../model/posts.model'; // Adjust the path to your PostModel

// describe('userPosts function', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should fetch limited posts based on provided IDs', async () => {
//     const mockPostIds = ['id1', 'id2', 'id3']; // Replace with actual post IDs
//     const mockPosts = [
//       { _id: 'id1', title: 'Post 1' },
//       { _id: 'id2', title: 'Post 2' },
//       { _id: 'id3', title: 'Post 3' },
//     ]; // Replace with actual posts

//     // Mock the PostModel.find method
//     PostModel.find = jest.fn().mockResolvedValue(mockPosts);

//     const result = await userPosts(mockPostIds, 2); // Fetch 2 posts

//     expect(result).toEqual(mockPosts.slice(0, 2));
//     expect(PostModel.find).toHaveBeenCalledWith({ _id: { $in: mockPostIds } });
//   });

//   it('should return an empty array for empty post IDs', async () => {
//     const emptyPostIds: string[] = [];

//     const result = await userPosts(emptyPostIds, 5);

//     expect(result).toEqual([]);
//     expect(PostModel.find).not.toHaveBeenCalled();
//   });

//   it('should default to fetching 10 posts when no limit is specified', async () => {
//     const mockPostIds = ['id1', 'id2', 'id3'];

//     await userPosts(mockPostIds, undefined);

//     expect(PostModel.find).toHaveBeenCalledWith({ _id: { $in: mockPostIds } });
//   });

//   it('should return all available posts if fewer than the specified limit', async () => {
//     const mockPostIds = ['id1', 'id2'];
//     const mockPosts = [
//       { _id: 'id1', title: 'Post 1' },
//       { _id: 'id2', title: 'Post 2' },
//     ];

//     PostModel.find = jest.fn().mockResolvedValue(mockPosts);

//     const result = await userPosts(mockPostIds, 5);

//     expect(result).toEqual(mockPosts);
//   });

//   it('should return the first "limit" posts if more than the specified limit', async () => {
//     const mockPostIds = ['id1', 'id2', 'id3', 'id4', 'id5'];
//     const mockPosts = [
//       { _id: 'id1', title: 'Post 1' },
//       { _id: 'id2', title: 'Post 2' },
//       { _id: 'id3', title: 'Post 3' },
//       { _id: 'id4', title: 'Post 4' },
//       { _id: 'id5', title: 'Post 5' },
//     ];

//     PostModel.find = jest.fn().mockResolvedValue(mockPosts);

//     const result = await userPosts(mockPostIds, 3);

//     expect(result).toEqual(mockPosts.slice(0, 3));
//   });

//   it('should handle database query failure', async () => {
//     const mockPostIds = ['id1', 'id2'];

//     // Mock PostModel.find to throw an error
//     PostModel.find = jest.fn().mockRejectedValue(new Error('Database query failed'));

//     await expect(userPosts(mockPostIds, 2)).rejects.toThrow('Database query failed');
//   });
// });
