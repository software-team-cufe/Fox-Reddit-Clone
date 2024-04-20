// import { Request, Response } from 'express';
// import { findUserComments } from '../service/comment.service';
// import { findUserIdByUsername } from '../service/user.service';
// /**
//  * Handles user comments by username request.
//  *
//  * @param req - The request object containing the user data.
//  * @param res - The response object to send the result.
//  * @returns A response for user comments by username.
//  */
// export async function commentsByUsrnameHandler(req: Request, res: Response) {
//   try {
//     // Extract params
//     const username: string = req.params.username as string;
//     const sortBy: string = req.query.sortBy as string;

//     if (!sortBy || !username) {
//       return res.status(400).send('Invalid request');
//     }

//     const userId = await findUserIdByUsername(username);

//     if (!userId) {
//       return res.status(404).send('User not found');
//     }

//     const retrievedComments = await findUserComments(userId, sortBy);

//     if (retrievedComments && retrievedComments.length > 0) {
//       return res.status(200).send(retrievedComments);
//     } else {
//       return res.status(404).send('No comments found for this user');
//     }
//   } catch (error) {
//     console.error('Error handling user request:', error);
//     return res.status(500).send('Internal server error');
//   }
// }
