// import { deleteHandler, editUserTextHandler, insightsCountsHandler } from '../controller/listing.controller';
// import { findUserByUsername } from '../service/user.service';
// import { findCommentById } from '../service/comment.service';
// import { findPostById } from '../service/post.service';
// import { Request, Response, NextFunction } from 'express';
// import { UserModel } from '../model/user.model';
// import CommentModel from '../model/comments.model';
// import PostModel from '../model/posts.model';

// // Mock functions and modules
// jest.mock('../service/user.service');
// jest.mock('../service/comment.service');
// jest.mock('../service/post.service');
// jest.mock('../model/user.model');
// jest.mock('../model/comments.model');
// jest.mock('../model/posts.model');

// // describe('deleteHandler function', () => {
// //   let req: Partial<Request>;
// //   let res: Partial<Response>;
// //   let next: jest.MockedFunction<NextFunction>;

// //   beforeEach(() => {
// //     req = {
// //       body: {
// //         linkID: 'link_id', // Provide a valid link ID for testing
// //       },
// //     };
// //     res = {
// //       status: jest.fn().mockReturnThis(),
// //       json: jest.fn(),
// //     };
// //     next = jest.fn();
// //   });

// //   it('should delete a comment successfully', async () => {
// //     const commentId = 'comment_id'; // Provide a valid comment ID for testing
// //     const commentMock = {
// //       _id: commentId,
// //       isDeleted: false,
// //     };
// //     (findCommentById as jest.Mock).mockResolvedValueOnce(commentMock);
// //     await deleteHandler(req as Request, res as Response, next);
// //     expect(CommentModel.findByIdAndUpdate).toHaveBeenCalledWith(
// //       commentId,
// //       { isDeleted: true },
// //       { upsert: true, new: true }
// //     );
// //     expect(res.status).toHaveBeenCalledWith(200);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'success',
// //       message: 'Comment is deleted successfully',
// //     });
// //   });

// //   it('should delete a post successfully', async () => {
// //     const postId = 'post_id'; // Provide a valid post ID for testing
// //     const postMock = {
// //       _id: postId,
// //       isDeleted: false,
// //     };
// //     (req.body.linkID as string) = `3_${postId}`;
// //     (findPostById as jest.Mock).mockResolvedValueOnce(postMock);
// //     await deleteHandler(req as Request, res as Response, next);
// //     expect(PostModel.findByIdAndUpdate).toHaveBeenCalledWith(postId, { isDeleted: true }, { upsert: true, new: true });
// //     expect(res.status).toHaveBeenCalledWith(200);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'success',
// //       message: 'Post is deleted successfully',
// //     });
// //   });

// //   it('should return 400 if comment not found', async () => {
// //     (findCommentById as jest.Mock).mockResolvedValueOnce(null);
// //     await deleteHandler(req as Request, res as Response, next);
// //     expect(res.status).toHaveBeenCalledWith(400);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'failed',
// //       message: 'Comment not found',
// //     });
// //   });

// //   it('should return 400 if post not found', async () => {
// //     (req.body.linkID as string) = '3_invalid_post_id';
// //     (findPostById as jest.Mock).mockResolvedValueOnce(null);
// //     await deleteHandler(req as Request, res as Response, next);
// //     expect(res.status).toHaveBeenCalledWith(400);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'failed',
// //       message: 'Post not found',
// //     });
// //   });

// //   it('should return 400 if comment is already deleted', async () => {
// //     const commentId = 'deleted_comment_id'; // Provide a valid comment ID for testing
// //     const commentMock = {
// //       _id: commentId,
// //       isDeleted: true,
// //     };
// //     (findCommentById as jest.Mock).mockResolvedValueOnce(commentMock);
// //     await deleteHandler(req as Request, res as Response, next);
// //     expect(res.status).toHaveBeenCalledWith(400);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'failed',
// //       message: 'Comment is already deleted',
// //     });
// //   });

// //   it('should return 400 if post is already deleted', async () => {
// //     const postId = 'deleted_post_id'; // Provide a valid post ID for testing
// //     const postMock = {
// //       _id: postId,
// //       isDeleted: true,
// //     };
// //     (req.body.linkID as string) = `3_${postId}`;
// //     (findPostById as jest.Mock).mockResolvedValueOnce(postMock);
// //     await deleteHandler(req as Request, res as Response, next);
// //     expect(res.status).toHaveBeenCalledWith(400);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'failed',
// //       message: 'Post is already deleted',
// //     });
// //   });

// //   it('should handle errors and call next', async () => {
// //     const error = new Error('Test error');
// //     (findCommentById as jest.Mock).mockRejectedValueOnce(error);
// //     await deleteHandler(req as Request, res as Response, next);
// //     expect(next).toHaveBeenCalledWith(error);
// //   });
// // });

// // describe('insightsCountsHandler function', () => {
// //   let req: Partial<Request>;
// //   let res: Partial<Response>;
// //   let next: jest.MockedFunction<NextFunction>;

// //   beforeEach(() => {
// //     req = {
// //       params: {
// //         post: 'post_id', // Provide a valid post ID for testing
// //       },
// //     };
// //     res = {
// //       status: jest.fn().mockReturnThis(),
// //       json: jest.fn(),
// //     };
// //     next = jest.fn();
// //   });

// //   it('should return 400 if post is not found', async () => {
// //     (PostModel.findById as jest.Mock).mockResolvedValueOnce(null);
// //     await insightsCountsHandler(req as Request, res as Response, next);
// //     expect(res.status).toHaveBeenCalledWith(400);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'failed',
// //       message: 'Post not found',
// //     });
// //   });

// //   it('should return insights count if post is found', async () => {
// //     const postInsightCnt = 10; // Sample insights count
// //     const postMock = {
// //       insightCnt: postInsightCnt,
// //     };
// //     (PostModel.findById as jest.Mock).mockResolvedValueOnce(postMock);
// //     await insightsCountsHandler(req as Request, res as Response, next);
// //     expect(res.status).toHaveBeenCalledWith(200);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'succeeded',
// //       postInsightsCnt: postInsightCnt,
// //     });
// //   });

// //   it('should handle errors and call next', async () => {
// //     const error = new Error('Test error');
// //     (PostModel.findById as jest.Mock).mockRejectedValueOnce(error);
// //     await insightsCountsHandler(req as Request, res as Response, next);
// //     expect(next).toHaveBeenCalledWith(error);
// //   });
// // });

// // describe('editUserTextHandler function', () => {
// //   let req: Partial<Request>;
// //   let res: Partial<Response>;
// //   let next: jest.MockedFunction<NextFunction>;

// //   beforeEach(() => {
// //     req = {
// //       body: {
// //         username: 'test_username',
// //         linkID: 'p1234', // Example linkID
// //         text: 'updated_text',
// //       },
// //     };
// //     res = {
// //       status: jest.fn().mockReturnThis(),
// //       json: jest.fn(),
// //     };
// //     next = jest.fn();
// //   });

// //   afterEach(() => {
// //     jest.clearAllMocks();
// //   });

// //   it('should handle missing username', async () => {
// //     await editUserTextHandler(req as Request, res as Response, next);
// //     expect(res.status).toHaveBeenCalledWith(400);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'failed',
// //       message: 'Access token is missing or invalid',
// //     });
// //   });

// //   it('should handle missing linkID', async () => {
// //     delete req.body.linkID;
// //     await editUserTextHandler(req as Request, res as Response, next);
// //     expect(res.status).toHaveBeenCalledWith(400);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'failed',
// //       message: 'Invalid parameters',
// //     });
// //   });

// //   it('should handle invalid linkID', async () => {
// //     req.body.linkID = 'invalid';
// //     await editUserTextHandler(req as Request, res as Response, next);
// //     expect(res.status).toHaveBeenCalledWith(400);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'failed',
// //       message: 'Invalid parameters',
// //     });
// //   });

// //   it('should handle missing user', async () => {
// //     (findUserByUsername as jest.Mock).mockResolvedValueOnce(null);
// //     await editUserTextHandler(req as Request, res as Response, next);
// //     expect(res.status).toHaveBeenCalledWith(400);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'failed',
// //       message: 'Access token is missing or invalid',
// //     });
// //   });

// //   it('should handle missing post', async () => {
// //     (PostModel.findById as jest.Mock).mockResolvedValueOnce(null);
// //     await editUserTextHandler(req as Request, res as Response, next);
// //     expect(res.status).toHaveBeenCalledWith(400);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'failed',
// //       message: 'Post not found',
// //     });
// //   });

// //   it('should handle user not being the author of the post', async () => {
// //     (PostModel.findById as jest.Mock).mockResolvedValueOnce({ userID: 'otherUserID' });
// //     await editUserTextHandler(req as Request, res as Response, next);
// //     expect(res.status).toHaveBeenCalledWith(400);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'failed',
// //       message: 'You are not the author of this post!',
// //     });
// //   });

// //   it('should handle missing comment', async () => {
// //     (CommentModel.findById as jest.Mock).mockResolvedValueOnce(null);
// //     await editUserTextHandler(req as Request, res as Response, next);
// //     expect(res.status).toHaveBeenCalledWith(400);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'failed',
// //       message: 'Comment not found',
// //     });
// //   });

// //   it('should handle user not being the author of the comment', async () => {
// //     (CommentModel.findById as jest.Mock).mockResolvedValueOnce({ authorId: 'otherUserID' });
// //     await editUserTextHandler(req as Request, res as Response, next);
// //     expect(res.status).toHaveBeenCalledWith(400);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'failed',
// //       message: 'You are not the author of this comment!',
// //     });
// //   });

// //   it('should handle database errors and call next', async () => {
// //     (findUserByUsername as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
// //     await editUserTextHandler(req as Request, res as Response, next);
// //     expect(next).toHaveBeenCalledWith(new Error('Database error'));
// //   });

// //   it('should handle update errors', async () => {
// //     (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);
// //     await editUserTextHandler(req as Request, res as Response, next);
// //     expect(res.status).toHaveBeenCalledWith(400);
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'failed',
// //       message: 'Error updating post',
// //     });
// //   });
// // });

// //////////////////////////////////////////////////////////////////////////////
// describe('deleteHandler', () => {
//   // Delete a comment successfully
//   it('should delete a comment successfully when the comment exists and is not already deleted', async () => {
//     // Mock the necessary functions and models
//     const findCommentByIdMock = jest.spyOn(commentService, 'findCommentById').mockResolvedValueOnce(comment);
//     const findByIdAndUpdateMock = jest.spyOn(commentModel, 'findByIdAndUpdate').mockResolvedValueOnce(updatedComment);

//     // Make the request to delete the comment
//     await deleteHandler(req, res, next);

//     // Assert that the necessary functions were called with the correct arguments
//     expect(findCommentByIdMock).toHaveBeenCalledWith(desiredID);
//     expect(findByIdAndUpdateMock).toHaveBeenCalledWith(comment._id, { isDeleted: true }, { upsert: true, new: true });

//     // Assert that the response status and message are correct
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       status: 'success',
//       message: 'Comment is deleted successfully',
//     });
//   });

//   // Return an error message when the user is not authenticated
//   it('should return an error message when the user is not authenticated', async () => {
//     // Mock the necessary functions and models
//     const findCommentByIdMock = jest.spyOn(commentService, 'findCommentById').mockResolvedValueOnce(comment);

//     // Set the user to null to simulate an unauthenticated user
//     res.locals.user = null;

//     // Make the request to delete the comment
//     await deleteHandler(req, res, next);

//     // Assert that the necessary functions were not called
//     expect(findCommentByIdMock).not.toHaveBeenCalled();

//     // Assert that the response status and message are correct
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       status: 'failed',
//       message: 'Access token is missing or invalid',
//     });
//   });
// });
//
