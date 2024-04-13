// import { deleteHandler } from '../controller/listing.controller';
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

// describe('deleteHandler function', () => {
//   let req: Partial<Request>;
//   let res: Partial<Response>;
//   let next: jest.MockedFunction<NextFunction>;

//   beforeEach(() => {
//     req = {
//       body: {
//         id: 'test_id',
//         username: 'test_username',
//       },
//     };
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//     next = jest.fn();
//   });

//   it('should return 401 if user is not found', async () => {
//     (findUserByUsername as jest.Mock).mockResolvedValueOnce(null);
//     await deleteHandler(req as Request, res as Response, next);
//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(res.json).toHaveBeenCalledWith({
//       status: 'failed',
//       message: 'Access token is missing or invalid',
//     });
//   });

//   it('should return 404 if comment is not found', async () => {
//     (findUserByUsername as jest.Mock).mockResolvedValueOnce({});
//     (findCommentById as jest.Mock).mockResolvedValueOnce(null);
//     await deleteHandler(req as Request, res as Response, next);
//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({
//       status: 'failed',
//       message: 'Comment not found',
//     });
//   });

//   it('should return 410 if comment is already deleted', async () => {
//     (findUserByUsername as jest.Mock).mockResolvedValueOnce({});
//     (findCommentById as jest.Mock).mockResolvedValueOnce({ isDeleted: true });
//     await deleteHandler(req as Request, res as Response, next);
//     expect(res.status).toHaveBeenCalledWith(410);
//     expect(res.json).toHaveBeenCalledWith({
//       status: 'failed',
//       message: 'Comment is already deleted',
//     });
//   });

//   it('should return 404 if post is not found', async () => {
//     (findUserByUsername as jest.Mock).mockResolvedValueOnce({});
//     (findCommentById as jest.Mock).mockResolvedValueOnce({});
//     (findPostById as jest.Mock).mockResolvedValueOnce(null);
//     await deleteHandler(req as Request, res as Response, next);
//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({
//       status: 'failed',
//       message: 'Post not found',
//     });
//   });

//   it('should return 410 if post is already deleted', async () => {
//     (findUserByUsername as jest.Mock).mockResolvedValueOnce({});
//     (findCommentById as jest.Mock).mockResolvedValueOnce({});
//     (findPostById as jest.Mock).mockResolvedValueOnce({ isDeleted: true });
//     await deleteHandler(req as Request, res as Response, next);
//     expect(res.status).toHaveBeenCalledWith(410);
//     expect(res.json).toHaveBeenCalledWith({
//       status: 'failed',
//       message: 'Post is already deleted',
//     });
//   });

//   it('should handle database update and return success', async () => {
//     (findUserByUsername as jest.Mock).mockResolvedValueOnce({});
//     (findCommentById as jest.Mock).mockResolvedValueOnce({});
//     (findPostById as jest.Mock).mockResolvedValueOnce({});
//     (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({});
//     (CommentModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({});
//     (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({});
//     await deleteHandler(req as Request, res as Response, next);
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       status: 'success',
//       message: 'Comment is deleted successfully',
//     });
//   });

//   it('should call next with error if an error occurs', async () => {
//     (findUserByUsername as jest.Mock).mockRejectedValueOnce(new Error('Test error'));
//     await deleteHandler(req as Request, res as Response, next);
//     expect(next).toHaveBeenCalledWith(new Error('Test error'));
//   });
// });
