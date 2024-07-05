// // import userCommets from '../service/comment.service';
// // import CommentModel, { Comment } from '../model/comments.model';
// // import { getUserSubmittedHandler } from '@src/controller/user.controller';
// // import appError from '@src/utils/appError';

// // jest.mock('../model/comments.model', () => ({
// //   find: jest.fn(),
// // }));

// // describe('userCommets', () => {
// //   afterEach(() => {
// //     jest.clearAllMocks();
// //   });

// //   it('should fetch comments based on provided IDs with default limit', async () => {
// //     // Arrange
// //     const commentsIDS = ['commentId1', 'commentId2'];
// //     const expectedComments: Partial<Comment>[] = [
// //       { _id: 'commentId1', userId: 'userId1', text: 'Comment 1' },
// //       { _id: 'commentId2', userId: 'userId2', text: 'Comment 2' },
// //     ];
// //     (CommentModel.find as jest.Mock).mockResolvedValueOnce(expectedComments as Comment[]);

// //     // Act
// //     const result = await userCommets(commentsIDS, 10); // Using default limit

// //     // Assert
// //     expect(CommentModel.find).toHaveBeenCalledWith({ _id: { $in: commentsIDS } });
// //     expect(result).toEqual(expectedComments);
// //   });

// //   it('should fetch comments based on provided IDs with custom limit', async () => {
// //     // Arrange
// //     const commentsIDS = ['commentId1', 'commentId2'];
// //     const expectedComments: Partial<Comment>[] = [
// //       { _id: 'commentId1', userId: 'userId1', text: 'Comment 1' },
// //       { _id: 'commentId2', userId: 'userId2', text: 'Comment 2' },
// //     ];
// //     (CommentModel.find as jest.Mock).mockResolvedValueOnce(expectedComments as Comment[]);

// //     // Act
// //     const result = await userCommets(commentsIDS, 5); // Custom limit

// //     // Assert
// //     expect(CommentModel.find).toHaveBeenCalledWith({ _id: { $in: commentsIDS } });
// //     expect(result).toEqual(expectedComments);
// //   });

// //   it('should fetch comments with default limit if limit parameter is not provided', async () => {
// //     // Arrange
// //     const commentsIDS = ['commentId1', 'commentId2'];
// //     const expectedComments: Partial<Comment>[] = [
// //       { _id: 'commentId1', userId: 'userId1', text: 'Comment 1' },
// //       { _id: 'commentId2', userId: 'userId2', text: 'Comment 2' },
// //     ];
// //     (CommentModel.find as jest.Mock).mockResolvedValueOnce(expectedComments as Comment[]);

// //     // Act
// //     const result = await userCommets(commentsIDS, undefined); // No limit provided

// //     // Assert
// //     expect(CommentModel.find).toHaveBeenCalledWith({ _id: { $in: commentsIDS } });
// //     expect(result).toEqual(expectedComments);
// //   });
// // });
// // Should handle and return errors thrown by userSubmittedPosts and userPosts functions
// // Should return a 200 status code with an empty array when the user does not exist

// import { userCommets } from '../service/comment.service'; // Adjust the path to your actual function
// import CommentModel from '../model/comments.model'; // Adjust the path to your CommentModel

// describe('userCommets function', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should fetch limited comments based on provided IDs', async () => {
//     const mockCommentIds = ['id1', 'id2', 'id3']; // Replace with actual comment IDs
//     const mockComments = [
//       { _id: 'id1', text: 'Comment 1' },
//       { _id: 'id2', text: 'Comment 2' },
//       { _id: 'id3', text: 'Comment 3' },
//     ]; // Replace with actual comments

//     // Mock the CommentModel.find method
//     CommentModel.find = jest.fn().mockResolvedValue(mockComments);

//     const result = await userCommets(mockCommentIds, 2); // Fetch 2 comments

//     expect(result).toEqual(mockComments.slice(0, 2));
//     expect(CommentModel.find).toHaveBeenCalledWith({ _id: { $in: mockCommentIds } });
//   });

//   it('should handle empty comment IDs', async () => {
//     const emptyCommentIds: string[] = [];

//     const result = await userCommets(emptyCommentIds, 5);

//     expect(result).toEqual([]);
//     expect(CommentModel.find).not.toHaveBeenCalled();
//   });

//   it('should default to fetching 10 comments when no limit is specified', async () => {
//     const mockCommentIds = ['id1', 'id2', 'id3'];

//     await userCommets(mockCommentIds, undefined);

//     expect(CommentModel.find).toHaveBeenCalledWith({ _id: { $in: mockCommentIds } });
//   });

//   it('should return all available comments if fewer than the specified limit', async () => {
//     const mockCommentIds = ['id1', 'id2'];
//     const mockComments = [
//       { _id: 'id1', text: 'Comment 1' },
//       { _id: 'id2', text: 'Comment 2' },
//     ];

//     CommentModel.find = jest.fn().mockResolvedValue(mockComments);

//     const result = await userCommets(mockCommentIds, 5);

//     expect(result).toEqual(mockComments);
//   });

//   it('should return the first "limit" comments if more than the specified limit', async () => {
//     const mockCommentIds = ['id1', 'id2', 'id3', 'id4', 'id5'];
//     const mockComments = [
//       { _id: 'id1', text: 'Comment 1' },
//       { _id: 'id2', text: 'Comment 2' },
//       { _id: 'id3', text: 'Comment 3' },
//       { _id: 'id4', text: 'Comment 4' },
//       { _id: 'id5', text: 'Comment 5' },
//     ];

//     CommentModel.find = jest.fn().mockResolvedValue(mockComments);

//     const result = await userCommets(mockCommentIds, 3);

//     expect(result).toEqual(mockComments.slice(0, 3));
//   });

//   it('should handle database query failure', async () => {
//     const mockCommentIds = ['id1', 'id2'];

//     // Mock CommentModel.find to throw an error
//     CommentModel.find = jest.fn().mockRejectedValue(new Error('Database query failed'));

//     await expect(userCommets(mockCommentIds, 2)).rejects.toThrow('Database query failed');
//   });
// });
