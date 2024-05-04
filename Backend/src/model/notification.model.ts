import { prop, getModelForClass, Ref, DocumentType, pre, ReturnModelType, post } from '@typegoose/typegoose';
import { User } from './user.model';
import { Community } from './community.model';
import { Types } from 'mongoose';
export class Notifications {
  @prop({ required: false })
  Icon: string;

  @prop({ required: true })
  title: string;

  @prop({
    required: true,
    enum: ['message', 'comment', 'Upvote', 'reply', 'newFollower', 'newPost'],
  })
  type: string;

  @prop()
  text: string;

  @prop({ required: true })
  source: Types.ObjectId;

  @prop({ default: Date.now })
  createdAt: Date;
}

const NotificationsModel = getModelForClass(Notifications);

export default NotificationsModel;
