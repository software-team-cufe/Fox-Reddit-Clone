import { prop, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
export class Session {
  @prop({ ref: () => User, required: true })
  user: Ref<User>;

  @prop({ default: true })
  valid: boolean;
}
