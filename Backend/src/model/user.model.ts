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
import { Community } from './community.model';
import { Notifications } from './notification.model';
import { Types } from 'mongoose';
//import { Validator } from 'validator';

export const privateFields = [
  'password',
  'verificationCode',
  'passwordResetCode',
  'verified',
  'prefs',
  'upvotedPosts',
  'downvotedPosts',
  'contentVisibility',
  'canCreateSubreddit',
  'showActiveCommunities',
  'type',
  'friendRequestToMe',
  'friendRequestFromMe',
  'friend',
  'blocksFromMe',
  'blocksToMe',
  'hasPost',
  'hasComment',
  'hasReply',
  'followPost',
  'hiddenPosts',
  'savedPosts',
  'mentionedInPosts',
  'mentionedInComments',
  'meReturn',
  'aboutReturn',
  'commMember',
  'hasVote',
  'updatedAt',
  '__v',
];

export class UserPrefs {
  @prop({ default: true })
  emailPrivateMessage?: boolean;

  @prop({ default: 'EG' })
  countryCode?: string;

  @prop()
  commentsNum?: number;

  @prop({ default: true })
  emailCommentReply?: boolean;

  @prop({ default: true })
  emailUpvoteComment?: boolean;

  @prop({ default: true })
  emailMessages?: boolean;

  @prop({ default: true })
  emailUnsubscribeAll?: boolean;

  @prop({ default: true })
  emailUpvote?: boolean;

  @prop({ default: true })
  emailUsernameMention?: boolean;

  @prop({ default: true })
  emailUserNewFollower?: boolean;

  @prop({ default: true })
  emailPostReply?: boolean;

  @prop({ default: true })
  over18?: boolean;

  @prop({ default: true })
  showPostInNewWindow?: boolean;

  @prop({ default: true })
  labelNSFW?: boolean;

  @prop({ default: true })
  liveOrangereds?: boolean;

  @prop({ default: true })
  markMessagesRead?: boolean;

  @prop({ default: true })
  enableFollowers?: boolean;

  @prop({ default: true })
  publicVotes?: boolean;

  @prop({ default: true })
  showLinkFlair?: boolean;

  @prop({ default: true })
  showLocationBasedRecommendation?: boolean;

  @prop({ default: true })
  searchIncludeOver18?: boolean;

  @prop({ default: 'new' })
  defaultCommentSort?: 'top' | 'new' | 'random' | 'best' | 'hot';

  @prop({ default: 'en' })
  language?: string;

  @prop({ default: true })
  threadedMessages?: boolean;

  @prop({ default: true })
  prefShowTrending?: boolean;
}
export class notificationSettings {
  @prop({ default: true })
  messages?: boolean;

  @prop({ default: true })
  chatMessages?: boolean;

  @prop({ default: true })
  chatRequests?: boolean;

  @prop({ default: true })
  mentionOfUsername?: boolean;

  @prop({ default: true })
  commentsOnYourPosts?: boolean;

  @prop({ default: true })
  upvotesOnYourPosts?: boolean;

  @prop({ default: true })
  upvotedOnYourComments?: boolean;

  @prop({ default: true })
  repliesToYourComments?: boolean;

  @prop({ default: true })
  activityOnYourComments?: boolean;

  @prop({ default: true })
  activityOnChatPostsYoureIn?: boolean;

  @prop({ default: true })
  newFollowers?: boolean;

  @prop({ default: true })
  awardsYouReceive?: boolean;

  @prop({ default: true })
  postsYouFollow?: boolean;

  @prop({ default: true })
  commentsYouFollow?: boolean;

  @prop({ default: true })
  trendingPosts?: boolean;

  @prop({ default: true })
  communityRecommendations?: boolean;

  @prop({ default: true })
  reReddit?: boolean;

  @prop({ default: true })
  featuredContent?: boolean;

  @prop({ default: true })
  communityAlerts?: boolean;

  @prop({ default: true })
  redditAnnouncements?: boolean;

  @prop({ default: true })
  cakeDay?: boolean;

  @prop({ default: true })
  modNotifications?: boolean;
}

class About {
  @prop({ default: false })
  isBlocked?: boolean;

  @prop({ default: false })
  isModerator?: boolean;

  @prop({ default: true })
  acceptFollowers?: boolean;
}

class Me {
  @prop({ default: true })
  emailUserNewFollower?: boolean;

  @prop({ default: true })
  emailUsernameMention?: boolean;

  @prop({ default: true })
  emailUpVotePost?: boolean;
}

class IsBannedOrMuted {
  @prop({ default: false })
  value?: boolean;

  @prop()
  date?: Date;
}
export class notificationInfo {
  @prop({ required: true, ref: () => 'Notifications' })
  notificationId?: Ref<Notifications>;

  @prop({ default: false })
  isRead!: boolean;

  @prop({ default: false })
  isHidden!: boolean;
}

class Member {
  @prop({ ref: () => 'Community' })
  communityId?: Ref<Community>;

  @prop({ type: IsBannedOrMuted, default: () => new IsBannedOrMuted() })
  isMuted?: IsBannedOrMuted;

  @prop({ type: IsBannedOrMuted, default: () => new IsBannedOrMuted() })
  isBanned?: IsBannedOrMuted;
}

export class VotePost {
  @prop({ ref: () => 'Post' })
  postID?: Ref<Post>;

  @prop({ enum: [1, -1] })
  type?: number;
}

class VoteComment {
  @prop({ ref: () => 'Comment' })
  commentID?: Ref<Comment>;

  @prop({ enum: [1, -1] })
  type?: number;
}

export class Moderator {
  @prop({ ref: () => 'Community' })
  communityId?: Ref<Community>;

  @prop({ enum: ['creator', 'moderator'] })
  role?: string;
}
@pre<User>('save', async function (this: DocumentType<User>) {
  if (!this.isModified('password')) {
    return;
  }

  const hashedPassword = await argon2.hash(this.password);
  this.password = hashedPassword;
  return;
})
@index({ email: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({
    lowercase: true,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value),
      message: 'Invalid email format',
    },
  })
  email: string;

  @prop({ required: true, unique: true, validator: (value: string) => value.length >= 3 && value.length <= 20 })
  username: string;

  @prop({ required: true, validator: (value: string) => value.length >= 8 && value.length <= 200 })
  password: string;

  @prop()
  birthdate?: string;

  @prop()
  phoneNumber?: string;

  @prop({ required: true, default: () => new Date() })
  createdAt!: Date;

  @prop({ default: 'https://res.cloudinary.com/dvnf8yvsg/image/upload/v1714594934/vjhqqv4imw26krszm7hr.png' })
  avatar?: string;

  @prop({ enum: ['male', 'female'] })
  gender?: string;

  @prop()
  about?: string;

  @prop({ default: true })
  contentVisibility?: boolean;

  @prop({ default: 0 })
  postKarma?: number;

  @prop({ default: 0 })
  commentKarma?: number;

  @prop({ default: 0 })
  karma?: number;

  @prop()
  inboxCount?: number;

  @prop({ default: true })
  canCreateSubreddit?: boolean;

  @prop()
  friendsCount?: number;

  @prop({ default: false, select: false })
  isDeleted?: boolean;

  @prop({ required: true, default: () => nanoid() })
  verificationCode: string;

  @prop()
  passwordResetCode: string | null;

  @prop({ default: false })
  verified: boolean;

  @prop({ default: true })
  showActiveCommunities?: boolean;

  @prop({ default: () => new UserPrefs() })
  prefs?: UserPrefs;

  @prop({ default: () => new notificationSettings() })
  notificationPrefs?: notificationSettings;

  @prop({ default: () => new Me() })
  meReturn?: Me;

  @prop({ default: () => new About() })
  aboutReturn?: About;

  // @prop({ default: () => new Member() })
  // commMember?: Member;

  @prop({ enum: ['bare email', 'facebook', 'gmail'], default: 'bare email' })
  type?: string;

  /***************************************
   recursive relations
   ***************************************/
  @prop()
  followers?: User[]; // Array of user references
  @prop()
  userFollows?: User[]; // Array of user references

  @prop({ ref: User })
  friendRequestToMe?: User[]; // Array of user references

  @prop({ ref: User })
  friendRequestFromMe?: User[]; // Array of user references

  @prop({ ref: User })
  friend?: User[]; // Array of user references

  @prop({ ref: User })
  blocksFromMe?: User[]; // Array of user

  @prop({ ref: User })
  blocksToMe?: User[]; // Array of user references

  /***************************************
             relations
   ***************************************/

  //sharif suggestion
  @prop()
  notifArray?: notificationInfo[];

  @prop({ ref: () => 'Post' })
  hasPost?: Ref<Post>[];

  @prop({ ref: () => 'Comment' })
  hasComment?: Ref<Comment>[];

  @prop({ ref: () => 'Comment' })
  hasReply?: Ref<Comment>[];

  @prop()
  postVotes?: VotePost[];

  @prop()
  commentVotes?: VoteComment[];

  @prop({ ref: 'Post' })
  followPost?: Ref<Post>[];

  @prop({ ref: () => 'Post' })
  hiddenPosts?: Ref<Post>[];

  @prop({ ref: () => 'Post' })
  savedPosts?: Ref<Post>[];

  @prop({ ref: 'Post' })
  mentionedInPosts?: Ref<Post>[];

  @prop({ ref: () => 'Comment' })
  mentionedInComments?: Ref<Comment>[];

  @prop()
  member?: Member[];

  @prop()
  moderators?: Moderator[];

  @prop({ ref: () => 'Community' })
  favorites?: Ref<Community>[];

  //////////////////////////////////////////////
  // @prop({ type: () => [String] })
  // messages?: string[];
  // @prop({ type: () => [String] })
  // follows?: string[];
  // @prop({ type: () => [String] })
  // categories?: string[];
  //////////////////////////////////////////////////////
  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (e) {
      //  log.error(e, 'Error validating password');
      return false;
    }
  }
  //check this function, why saveUser?
  async saveUser(): Promise<User> {
    const UserModel = getModelForClass(User); // Retrieve the Mongoose model for User class
    const user = new UserModel(this); // Create a new instance of User model
    return await user.save(); // Save the user to the database and return the saved user object
  }
}

export const UserModel = getModelForClass(User);
export default UserModel;
