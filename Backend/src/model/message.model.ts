import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user.model';

export class Message {
  //   @prop()
  //   fromID!: string;
  //   @prop()
  //   toID!: string;
  @prop({ required: true, ref: () => User })
  fromID!: Ref<User>;

  @prop({ required: true, ref: () => User })
  toID!: Ref<User>;

  @prop({ default: false })
  isDeleted!: boolean;

  @prop({ default: true })
  unread_status!: boolean;

  @prop({ required: [true, 'A message must have a subject!'], trim: true, maxlength: 100000, minlength: 1 })
  subject!: string;

  @prop({ default: Date.now })
  createdAt!: Date;

  @prop({ required: [true, 'A message must have a text!'], trim: true, maxlength: 100000, minlength: 1 })
  text!: string;

  @prop({ default: false })
  isReply!: boolean;

  @prop({ ref: Message, default: [] })
  Replies!: Message[];
}

const MessageModel = getModelForClass(Message);

export default MessageModel;
