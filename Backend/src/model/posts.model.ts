import { prop, getModelForClass, modelOptions, Severity, pre, DocumentType, index } from '@typegoose/typegoose';
import * as argon2 from 'argon2';
import { Comment } from './comments.model';
import { User } from './user.model';
export class Post {
  @prop()
  postID: string;

  @prop()
  attachments: string[];

  @prop()
  upvotesCount: number;

  @prop()
  downvotesCount: number;

  @prop()
  userID: string;

  @prop()
  userName: string;

  @prop()
  communityID: string;

  @prop()
  communityName: string;

  @prop()
  createdAt: number;

  @prop()
  caption: string;

  @prop()
  title: string;

  @prop()
  nsfw: boolean;

  @prop()
  spoiler: boolean;

  @prop()
  flairID: string;

  @prop()
  flairText: string;

  @prop({ type: [Comment], default: [] })
  comments: Comment[];
}

export const PostModel = getModelForClass(Post);

export default PostModel;
