import { prop, getModelForClass, modelOptions, Severity, pre, DocumentType, index } from '@typegoose/typegoose';
import * as argon2 from 'argon2';
import { nanoid } from 'nanoid';

export const privateFields = ['password', '__v', 'verificationCode', 'passwordResetCode', 'verified', 'prefs'];

export class UserPrefs {
  @prop({ type: Boolean, default: true })
  numComments: boolean;

  @prop({ type: Boolean, default: true })
  threadedMessages: boolean;

  @prop({ type: Boolean, default: true })
  showLinkFlair: boolean;

  @prop({ type: String, default: 'EG' })
  countryCode: string;

  @prop({ type: Boolean, default: true })
  emailCommentReply: boolean;

  @prop({ type: Boolean, default: true })
  emailUpvoteComment: boolean;

  @prop({ type: Boolean, default: true })
  emailMessages: boolean;

  @prop({ type: Boolean, default: true })
  emailUnsubscribeAll: boolean;

  @prop({ type: Boolean, default: true })
  emailUpvotePost: boolean;

  @prop({ type: Boolean, default: true })
  emailUsernameMention: boolean;

  @prop({ type: Boolean, default: true })
  emailUserNewFollower: boolean;

  @prop({ type: Boolean, default: true })
  emailPostReply: boolean;

  @prop({ type: Boolean, default: true })
  emailPrivateMessage: boolean;

  @prop({ type: Boolean, default: true })
  over18: boolean;

  @prop({ type: Boolean, default: true })
  newwindow: boolean;

  @prop({ type: Boolean, default: true })
  labelNsfw: boolean;

  @prop({ type: Boolean, default: true })
  liveOrangeReds: boolean;

  @prop({ type: Boolean, default: true })
  markMessageRead: boolean;

  @prop({ type: Boolean, default: true })
  enableFollwers: boolean;

  @prop({ type: Boolean, default: true })
  publicVotes: boolean;

  @prop({ type: Boolean, default: true })
  showLocationBasedRecommendations: boolean;

  @prop({ type: Boolean, default: true })
  searchIncludeOver18: boolean;

  @prop({ type: String, default: 'Best' })
  defaultCommentSort: string;

  @prop({ type: String, default: 'en' })
  langauge: string;
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

  @prop({ required: true, default: () => nanoid() })
  verificationCode: string;

  @prop()
  passwordResetCode: string | null;

  @prop({ default: false })
  verified: boolean;

  @prop({
    type: () => UserPrefs,
    default: {},
  })
  prefs: UserPrefs;

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (e) {
      //  log.error(e, 'Error validating password');
      return false;
    }
  }
}

export const UserModel = getModelForClass(User);

export default UserModel;
