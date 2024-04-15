import { prop, getModelForClass, Ref, DocumentType, pre, ReturnModelType, post } from '@typegoose/typegoose';
import { User } from './user.model';
import Community from './comments.model';
class Spam {
  @prop({ ref: () => User })
  spammerID!: Ref<User>;

  @prop()
  spamType!: string;

  @prop()
  spamText!: string;
}

class Vote {
  @prop({ ref: () => User })
  userID!: Ref<User>;

  @prop()
  voteType!: number;
}

export class Post {
  @prop({ required: true, ref: () => User })
  userID!: Ref<User>; ////////////////////////////////////////////////////////////////////////////////

  @prop({ required: true })
  title!: string;

  @prop()
  textHTML!: string;

  @prop()
  textJSON!: string;

  @prop({ ref: 'Community' })
  communities!: Ref<typeof Community>[];

  @prop({ default: false })
  isDeleted!: boolean;

  @prop({ type: () => [String] })
  attachments!: string[];

  @prop({ default: false })
  spoiler!: boolean;

  @prop({ default: false })
  locked!: boolean;

  @prop({ enum: ['link', 'image', 'linkWithImage'], default: 'linkWithImage' })
  type!: string;

  @prop({ default: false })
  nsfw!: boolean;

  @prop({ default: 1 })
  insightCnt!: number;

  @prop({ default: 0 })
  spamCount!: number;

  @prop({ default: 1 })
  votesCount!: number;

  @prop()
  flairID!: string;

  @prop()
  flairText!: string;

  @prop()
  flairTextColor!: string;

  @prop()
  flairBackGround!: string;

  @prop({ default: Date.now })
  createdAt!: Date;

  @prop()
  editedAt?: Date;

  @prop({ type: () => [String] })
  followers!: string[];

  // @prop({ ref: () => User })
  // communityID!: Ref<User>;

  @prop({ type: () => [Spam] })
  spammers!: Spam[];

  @prop({ type: () => [Vote] })
  voters!: Vote[];

  @prop({ type: () => [String], ref: () => User })
  mentionedInUsers!: Ref<User>[]; ///////////////////////////////////////////////////////

  @prop({ type: () => [String], ref: () => User }) //////////////////////////////////
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
