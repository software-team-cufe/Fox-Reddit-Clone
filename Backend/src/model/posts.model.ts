import { prop, getModelForClass, Ref, DocumentType, pre, ReturnModelType, post } from '@typegoose/typegoose';
import { User } from './user.model';
import { Comment } from './comments.model';
import { Community } from './community.model';
// class Spam {
//   @prop({ ref: () => User })
//   spammerID!: Ref<User>;

//   @prop()
//   spamType!: string;

//   @prop()
//   spamText!: string;
// }

class VotePost {
  @prop({ ref: () => User })
  userID!: Ref<User>;

  @prop({ enum: [1, -1] })
  type!: number;
}

class PollOption {
  @prop()
  title!: string;

  @prop({ default: 0 })
  votes!: number;
}
class Mention {
  @prop({ ref: () => User })
  mentionerID!: Ref<User>;

  @prop({ ref: () => Post })
  postID!: Ref<Post>;

  @prop({ ref: () => Comment })
  commentID!: Ref<Comment>;

  @prop()
  date?: Date;
}
class PostReply {
  @prop({ ref: () => User })
  replierID!: Ref<User>;

  @prop({ ref: () => 'Post' })
  postID!: Ref<Post>;

  @prop()
  date?: Date;
}
export class Post {
  @prop({ required: true, ref: () => User })
  userID!: Ref<User>;

  @prop({ required: true })
  title!: string;

  @prop()
  textHTML!: string;

  @prop()
  textJSON!: string;

  // @prop({ ref: 'Community' })
  // communities!: Ref<typeof Community>[];

  @prop({ default: false })
  isDeleted!: boolean;

  @prop({ type: () => [String] })
  attachments!: string[];

  @prop({ type: () => [PollOption], required: false })
  poll?: PollOption[];

  @prop({ default: false })
  spoiler!: boolean;

  @prop({ default: false })
  isLocked!: boolean;

  @prop({ enum: ['link', 'image', 'linkWithImage'], default: 'linkWithImage' })
  type!: string;

  @prop({ default: false })
  nsfw!: boolean;

  @prop({ default: false })
  isHidden!: boolean;

  @prop({ default: 1 })
  insightCnt!: number;

  @prop({ default: 0 })
  spamCount!: number;

  @prop({ default: 0 })
  votesCount!: number;

  @prop({ default: Date.now })
  createdAt!: Date;

  @prop()
  editedAt?: Date;

  @prop({ type: () => [String] })
  followers!: string[];

  @prop({ ref: () => 'Community' })
  CommunityID?: Ref<Community>;

  // @prop({ type: () => [Spam] })
  // spammers!: Spam[];

  @prop()
  votes!: VotePost[];

  @prop()
  mentionedIn: Mention[];

  @prop()
  repliedInPost?: PostReply[];

  @prop({ type: () => [String], ref: () => User })
  postComments: Ref<Comment>[];

  @prop()
  commentsNum!: number;

  @prop()
  hotnessFactor!: number;

  @prop()
  bestFactor!: number;
}
// Add the function as a static method on the Post class
// static async incrementInsightCount(doc: DocumentType<Post>) {
//   await PostModel.updateOne({ _id: doc._id }, { $inc: { insightCnt: 1 } });
// }
// static async preFind(next: () => void) {
//   await PostModel.updateMany({}, { $inc: { insightCnt: 1 } }).exec();
//   next();
// }

// @pre<Post>('find', function (next) {
//   const doc = this as DocumentType<Post>;
//   Post.incrementInsightCount(doc);
//   next();
// })

// @pre<typeof Post>('find', function (next) {
//   PostModel.updateMany({}, { $inc: { insightCnt: 1 } }).exec(); // Use the model to update
//   next();
// })
const PostModel = getModelForClass(Post);

// // Define pre-hook directly within the schema definition
// PostModel.pre('find', async function (this: Post, next: () => void) {
//   await this.updateMany({}, { $inc: { insightCnt: 1 } });
//   next();
// });

export default PostModel;
