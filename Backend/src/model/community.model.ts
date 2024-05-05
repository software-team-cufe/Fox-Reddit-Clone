import {
  prop,
  getModelForClass,
  modelOptions,
  Severity,
  pre,
  DocumentType,
  index,
  queryMethod,
  Ref,
} from '@typegoose/typegoose';
import * as argon2 from 'argon2';
import { nanoid } from 'nanoid';
import { Post } from './posts.model';
import { Comment } from './comments.model';
import { User } from './user.model';
import { NextFunction } from 'express';
import { boolean } from 'zod';

export class CommunityRule {
  @prop()
  title?: string;

  @prop()
  description?: string;

  @prop()
  reason?: string;
}

export class removalReason {
  @prop()
  title?: string;

  @prop()
  description?: string;
}

export class ContentControls {
  @prop({ default: true })
  membersWithGuidelines!: boolean;

  @prop({ default: true })
  requirePostTitles!: boolean;

  @prop({ default: true })
  banWordsFromPostTitle!: boolean;

  @prop({ default: true })
  requirePostsInPostBody!: boolean;

  @prop({ default: true })
  banWordsFromPostBody!: boolean;

  @prop({ default: true })
  banLinksFromDomains!: boolean;

  @prop({ default: true })
  restrictTheSameLinkPosted!: boolean;

  @prop({ default: 'requiredForTextOnlyPosts' })
  textBody!: string;

  @prop({ default: true })
  postFlair!: boolean;

  @prop({ default: true })
  useRegExInTitles!: boolean;

  @prop({ default: true })
  useBodyTextReg!: boolean;
}

export class PostSettings {
  @prop({ default: 'Any' })
  postType!: string;

  @prop({ default: true })
  activePosts!: boolean;

  @prop({ default: true })
  spoilerTag!: boolean;

  @prop({ default: true })
  allowImageUpload!: boolean;

  @prop({ default: true })
  multiplePosts!: boolean;

  @prop({ default: true })
  allowPolls!: boolean;

  @prop({ default: 'low' })
  posts!: string;

  @prop({ default: 'low' })
  links!: string;

  @prop({ default: 'low' })
  comments!: string;

  @prop({ default: 'none' })
  suggestedSort!: string;

  @prop({ default: false })
  collapseAndDeleteRemovedComments!: boolean;

  @prop()
  minsToHideComment!: number;

  @prop({ default: false })
  allowCommentsWithGifs!: boolean;

  @prop({ default: false })
  allowCommentsWithCollectibleExpressions!: boolean;

  @prop({ default: false })
  allowCommentsWithUploadedImages!: boolean;

  @prop({ default: false })
  allowCommentsWithUploadedGIFs!: boolean;
}

export class TextWidget {
  @prop()
  title!: string;

  @prop()
  description!: string;
}

export class ButtonWidget {
  @prop()
  title!: string;

  @prop()
  link!: string;
}

export class ImageWidget {
  @prop()
  title!: string;

  @prop()
  image!: string;
}

class IsBanned {
  @prop({ default: false })
  value?: boolean;

  @prop()
  date?: Date;

  @prop({ default: 'member not banned' })
  reason?: string;

  @prop({ default: 'member not banned' })
  note?: string;

  @prop({ default: 0 })
  period?: string;
}

class IsMuted {
  @prop({ default: false })
  value?: boolean;

  @prop()
  date?: Date;

  @prop({ default: 'member not muted' })
  reason?: string;
}

export class Member {
  @prop({ ref: 'User' })
  userID?: Ref<User>;

  @prop({ type: IsMuted, default: () => new IsMuted() })
  isMuted?: IsMuted;

  @prop({ type: IsBanned, default: () => new IsBanned() })
  isBanned?: IsBanned;
}

class Moderator {
  @prop({ ref: 'User' })
  userID?: Ref<User>;

  @prop({ enum: ['creator', 'moderator'] })
  role?: string;
}

class SpamPost {
  @prop({ ref: () => User })
  spammerID!: Ref<User>;

  @prop({ ref: () => Post })
  postID!: Ref<Post>;

  @prop()
  spamType!: string;

  @prop()
  spamText!: string;
}

class SpamComment {
  @prop({ ref: () => User })
  spammerID!: Ref<User>;

  @prop({ ref: () => Post })
  postID!: Ref<Post>;

  @prop({ ref: () => Comment })
  commentID!: Ref<Comment>;

  @prop()
  spamType!: string;

  @prop()
  spamText!: string;
}

export class Community {
  //normal attributes
  @prop({ required: true, unique: true, validator: (value: string) => value.length >= 3 && value.length <= 20 })
  name?: string;

  @prop({ required: false, trim: true, maxLength: 100000, minLength: 1 })
  description?: string;

  @prop({ default: 'https://res.cloudinary.com/dvnf8yvsg/image/upload/v1714595299/gcnool3ibj3zfyoa1emq.jpg' })
  banner?: string;

  @prop({ default: 'https://res.cloudinary.com/dvnf8yvsg/image/upload/v1714908975/gduxbj1bsk7xnaqtqnc1.png' })
  icon?: string;

  @prop({ default: 0 })
  membersCnt?: number;

  @prop({ default: false })
  isDeleted?: boolean;

  @prop({ default: Date.now })
  createdAt?: Date;

  @prop({ default: 0 })
  rank?: number;

  @prop({ default: 0 })
  trendPoints?: number;

  @prop({ type: String, default: 'Public' })
  privacyType?: string;

  @prop({ type: String })
  categories?: string[];

  //settings attributes

  @prop()
  ImageWidget?: ImageWidget[];

  @prop()
  ButtonWidget?: ButtonWidget[];

  @prop()
  TextWidget?: TextWidget[];

  @prop()
  communityRules?: CommunityRule[];

  @prop()
  removalReasons?: removalReason[];

  @prop({ default: () => new PostSettings() })
  PostSettings?: PostSettings;

  @prop({ default: () => new ContentControls() })
  ContentControls?: ContentControls;

  //users attirbutes

  @prop()
  members?: Member[];

  @prop()
  moderators?: Moderator[];

  // @prop({ type: String, ref: 'User' })
  // invitedModerators?: Ref<User>[];

  @prop({ ref: 'User' })
  pendingMembers?: Ref<User>[];

  //listings attributes

  @prop()
  spamPosts?: SpamPost[];

  @prop()
  spamComments?: SpamComment[];

  @prop({ ref: 'Post' })
  communityPosts: Ref<Post>[];

  //extra attributes

  @prop({ type: [Number], default: [0, 0, 0, 0, 0, 0, 0] })
  pageViewsPerDay?: number[];

  @prop({ type: [Number], default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] })
  pageViewsPerMonth?: number[];

  @prop({ type: [Number], default: [0, 0, 0, 0, 0, 0, 0] })
  joinedPerDay?: number[];

  @prop({ type: [Number], default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] })
  joinedPerMonth?: number[];

  @prop({ type: [Number], default: [0, 0, 0, 0, 0, 0, 0] })
  leftPerDay?: number[];

  @prop({ type: [Number], default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] })
  leftPerMonth?: number[];

  // Post find hook
  static async afterFind(docs: DocumentType<Community>[], next: NextFunction) {
    try {
      const filterOfDays: Record<string, number> = {};
      const filterOfMonths: Record<string, number> = {};
      filterOfDays[`pageViewsPerDay.${new Date().getDay()}`] = 1;
      filterOfMonths[`pageViewsPerMonth.${new Date().getMonth()}`] = 1;

      const communityModel = getModelForClass(Community);
      await communityModel.updateMany({ _id: { $in: docs.map((doc) => doc._id) } }, { $inc: filterOfDays });
      await communityModel.updateMany({ _id: { $in: docs.map((doc) => doc._id) } }, { $inc: filterOfMonths });

      next();
    } catch (error) {
      // Handle error here
    }
  }
}

export const CommunityModel = getModelForClass(Community);

export default CommunityModel;
