import { prop, getModelForClass, DocumentType, pre, ReturnModelType, post, Ref } from '@typegoose/typegoose';
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
// @pre<Post>('find', async function (this: DocumentType<Post>) {
//   this.updateOne({}, { $inc: { insightCnt: 1 } }).exec(); // Ensure the updateOne method is executed
// })
export class Post {
  @prop({ required: true, ref: () => User })
  userID!: Ref<User>;

  @prop()
  username!: string;

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

  @prop()
  coummunityName!: string;
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

const PostModel = getModelForClass(Post);

export default PostModel;
