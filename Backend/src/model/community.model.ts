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

class FAQ {
  @prop()
  question?: string;

  @prop()
  answer?: string;
}

class CommunityOptions {
  @prop({ default: true })
  enableSpoilerTag?: boolean;

  @prop({ default: true })
  emailUsernameMention?: boolean;

  @prop({ default: false })
  nsfw?: boolean;

  @prop()
  welcomeMessage?: string;

  @prop({ default: true })
  allowImgAndLinksUploads?: boolean;

  @prop({ default: true })
  allowMultipleImagePerPost?: boolean;

  @prop({ default: 'best' })
  suggestedCommentSort?: string;

  @prop()
  postType?: number;

  @prop()
  region?: string;

  @prop({ default: 'public' })
  privacyType?: string;

  @prop({ default: 20 })
  spamsNumBeforeRemove?: number;
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

  @prop({ default: 'https://res.cloudinary.com/dvnf8yvsg/image/upload/v1714594934/vjhqqv4imw26krszm7hr.png' })
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

  //settings attributes

  @prop({ type: FAQ })
  FAQs?: FAQ[];

  @prop()
  communityRules?: CommunityRule[];

  @prop()
  removalReasons?: removalReason[];

  @prop({ type: CommunityOptions, default: {} })
  communityOptions?: CommunityOptions;

  @prop({ type: String })
  categories?: string[];

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
