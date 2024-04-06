import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
//import appError from '../utils/appError';
import { User } from './user.model';
import { Comment } from './comments.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

// // class Spam {
// //   // @prop({ ref: () => User })
// //   // spammerID?: Ref<User>;

// //   @prop()
// //   spamType?: string;

// //   @prop()
// //   spamText?: string;
// // }

class Vote {
  @prop({ ref: () => User })
  userrID?: Ref<User>;

  @prop()
  voteType?: number;
}

class Post {
  @prop({ required: true })
  postID?: string;

  @prop({ required: [true, 'A post must have a title!'], trim: true, maxlength: 150, minlength: 1 })
  title?: string;

  @prop({ trim: true })
  textHTML?: string;

  @prop({ trim: true })
  textJSON?: string;

  @prop({ default: false })
  isDeleted?: boolean;

  @prop({ type: () => [String] })
  attachments?: string[];

  @prop({ default: false })
  spoiler?: boolean;

  @prop({ default: false })
  locked?: boolean;

  @prop({ enum: ['link', 'image', 'linkWithImage'], default: 'linkWithImage' })
  type?: string;

  @prop({ default: false })
  nsfw?: boolean;

  @prop({ default: 1 })
  insightCnt?: number;

  @prop({ default: 0 })
  spamCount?: number;

  @prop({ default: 1 })
  votesCount?: number;

  @prop({ default: () => new Date() })
  createdAt?: Date;

  @prop()
  editedAt?: Date;

  @prop({ type: () => [String] })
  followers?: string[];

  @prop({ ref: () => Comment })
  communityID?: Ref<Comment>;

  @prop({ ref: () => User })
  userId: Ref<User>;

  // @prop({ type: () => [Spam] })
  // spammers?: Spam[];

  @prop({ type: () => [Vote] })
  voters?: Vote[];

  @prop({ type: () => [String], ref: () => User })
  mentionedInUsers?: Ref<User>[];

  @prop()
  commentsNum?: number;

  @prop({ ref: () => Post })
  postComments?: Post[];
  engagementScore: number;
}

// @prop({ type: () => [Object] }) // Assuming mongoose.Schema.ObjectId is a complex type
// postComments?: Object[];
// static async postFind(this: any, doc: any, next: () => void) {
//   await this.updateMany(this.getFilter(), { $inc: { insightCnt: 1 } });
//   next();
// }

const PostModel = getModelForClass(Post);

export { Post, PostModel };
