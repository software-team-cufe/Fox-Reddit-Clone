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

class FAQ {
  @prop()
  question?: string;

  @prop()
  answer?: string;
}

class Flair {
  @prop()
  flairID?: string;

  @prop({ default: 'defaultString' })
  flairText?: string;

  @prop()
  flairTextColor?: string;

  @prop()
  flairBackGround?: string;

  @prop({ default: false })
  flairModOnly?: boolean;

  @prop({ default: false })
  flairAllowUserEdits?: boolean;
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

class IsBannedOrMuted {
  @prop({ default: false })
  value?: boolean;

  @prop({ default: Date.now })
  date?: Date;
}

class Member {
  @prop({ ref: 'User' })
  userID?: Ref<User>;

  @prop({ type: IsBannedOrMuted, default: {} })
  isMuted?: IsBannedOrMuted;

  @prop({ type: IsBannedOrMuted, default: {} })
  isBanned?: IsBannedOrMuted;
}

class Moderator {
  @prop({ ref: 'User' })
  userID?: Ref<User>;

  @prop({ enum: ['creator', 'moderator'] })
  role?: string;
}

export class Community {
  @prop({ required: true, unique: true, validator: (value: string) => value.length >= 3 && value.length <= 20 })
  name?: string;

  @prop()
  subreddit?: string;

  @prop()
  communityRules?: CommunityRule[];

  @prop({ required: false, trim: true, maxLength: 100000, minLength: 1 })
  description?: string;

  @prop({ default: 'default-banner.jpg' })
  banner?: string;

  @prop({ default: 'default-icon.jpg' })
  icon?: string;

  @prop({ default: 0 })
  membersCnt?: number;

  @prop({ type: FAQ })
  FAQs?: FAQ[];

  @prop({ default: false })
  isDeleted?: boolean;

  @prop({ default: Date.now })
  createdAt?: Date;

  @prop({ default: 0 })
  rank?: number;

  @prop({ default: 0 })
  trendPoints?: number;

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

  @prop({ type: Flair })
  flairList?: Flair[];

  @prop({ type: CommunityOptions, default: {} })
  communityOptions?: CommunityOptions;

  @prop()
  members?: Member[];

  @prop()
  moderators?: Moderator[];

  @prop()
  category?: string;

  @prop({ type: String, default: 'public' }) // "public" (anyone can view and submit), "private" (only approved members can view and submit), or "restricted" (anyone can view, but only some are approved to submit links)
  privacyType?: string;

  // @prop({ type: boolean }) ////////////////////////////
  // over18?: boolean;

  @prop({ type: String })
  categories?: string[];

  @prop({ type: String, ref: 'User' })
  invitedModerators?: Ref<User>[];

  @prop({ ref: 'Post' })
  communityPosts: Ref<Post>[];

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
