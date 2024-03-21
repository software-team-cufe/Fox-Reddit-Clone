import { prop, getModelForClass, modelOptions, Severity, pre, DocumentType, index } from '@typegoose/typegoose';
import * as argon2 from 'argon2';
import { nanoid } from 'nanoid';
@pre<User>('save', async function () {
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
