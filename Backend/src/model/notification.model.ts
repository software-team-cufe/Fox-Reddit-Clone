import { prop, getModelForClass, Ref, DocumentType, pre, ReturnModelType, post } from '@typegoose/typegoose';
import { User } from './user.model';
import { Community } from './community.model';

export class Notifications {
  @prop({ required: true, ref: User })
  userIcon: User['avatar'];

  @prop({ required: true, ref: Community })
  communityIcon: Community['icon'];

  @prop({ required: true })
  title: string;

  @prop({
    required: true,
    enum: ['message', 'comment', 'Upvote', 'Replies', 'newFollower', 'newPost'],
  })
  type: string;

  @prop()
  text: string;

  @prop({ required: true })
  source: string;

  @prop({ default: Date.now })
  createdAt: Date;
}

const NotificationModel = getModelForClass(Notification);

export default NotificationModel;
