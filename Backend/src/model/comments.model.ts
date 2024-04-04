import { prop, getModelForClass, Ref, plugin } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { User } from './user.model';
//import { Post } from './post.model';
//import { CommunityModel, Community } from './community.model';
// @plugin(autopopulate)
// // class Spam {
// //   // @prop({ ref: () => User })
// //   // userID!: Ref<User>;

// //   @prop()
// //   text!: string;

// //   @prop()
// //   type!: string;
// // }

class Vote {
  @prop({ ref: () => User })
  voterID: Ref<User>;

  @prop()
  voteType!: number;
}
class Comment {
  @prop({ ref: () => User }) //@prop({ autopopulate: true, required: true, ref: () => User })
  userID!: Ref<User>;

  @prop({ default: true })
  isRoot!: boolean;

  @prop()
  replyingTo?: Schema.Types.ObjectId;

  // @prop({ ref: () => Post })
  // posttID!: Ref<Post>;

  @prop({ type: () => Schema.Types.ObjectId })
  replies!: Schema.Types.ObjectId[];

  @prop()
  textHTML!: string;

  @prop()
  textJSON!: string;

  @prop({ default: 1 })
  votessCount!: number;

  @prop({ type: () => Vote })
  voters!: Vote[];

  @prop({ default: Date.now })
  createdAt!: Date;

  @prop({ default: false })
  isDeleted!: boolean;

  @prop({ default: false })
  isLocked!: boolean;

  @prop()
  editedAt?: Date;

  //   @prop({ ref: () => Community })
  //   communityID!: Ref<Community>;

  @prop({ default: 0 })
  spamCount!: number;

  @prop({ default: false })
  isCollapsed!: boolean;

  // @prop({ type: () => Spam })
  // spams!: Spam[];
}
const CommentModel = getModelForClass(Comment);

export { Comment, CommentModel };
