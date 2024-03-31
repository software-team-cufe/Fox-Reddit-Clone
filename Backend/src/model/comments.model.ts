import { prop, getModelForClass, modelOptions, Severity, pre, DocumentType, index } from '@typegoose/typegoose';
import * as argon2 from 'argon2';
import { nanoid } from 'nanoid';
import { User } from './user.model';
import { Post } from '../model/posts.model';
export class Comment {
  @prop()
  commentId: string;

  @prop()
  commentText: string;

  @prop()
  upvotescount: number;

  @prop()
  downvotescount: number;

  @prop()
  createdAt: number;

  @prop()
  editedAt: number;

  @prop()
  post: Post;

  @prop()
  user: User;
}

export const CommentModel = getModelForClass(Comment);

export default CommentModel;
