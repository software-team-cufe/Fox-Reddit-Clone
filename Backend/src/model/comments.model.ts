import { prop, getModelForClass, Ref, pre } from '@typegoose/typegoose';

import { User } from './user.model';
import { Post } from './posts.model';

class Spam {
  @prop({ ref: () => User })
  userID!: Ref<User>;

  @prop()
  text!: string;

  @prop()
  type!: string;
}

class Vote {
  @prop({ ref: () => User })
  userID!: Ref<User>;

  @prop()
  voteType!: number;
}

export class Comment {
  @prop({ ref: () => User, required: true })
  authorId!: Ref<User>;

  @prop({ default: true })
  isRoot!: boolean;

  @prop()
  replyingTo!: Ref<Comment>;

  @prop({ ref: 'Post' })
  postID!: Ref<Post>;

  @prop({ ref: 'Comment' })
  replies!: Ref<Comment>[];

  @prop()
  textHTML!: string;

  @prop()
  textJSON!: string;

  @prop({ default: 1 })
  votesCount!: number;

  @prop({ type: () => [Vote] })
  voters!: Vote[];

  @prop({ default: Date.now })
  createdAt!: Date;

  @prop({ default: false })
  isDeleted!: boolean;

  @prop({ default: false })
  isLocked!: boolean;

  @prop()
  editedAt!: Date;

  @prop({ default: 0 })
  spamCount!: number;

  @prop({ default: false })
  isCollapsed!: boolean;

  @prop({ type: () => [Spam] })
  spams!: Spam[];
}

// @pre<Comment>('find', async function (next) {
//   const comments = await CommentModel.find();
//   for (const comment of comments) {
//     await comment.populate('postID');
//   }
//   next();
// })
const CommentModel = getModelForClass(Comment);

export default CommentModel;
