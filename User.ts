import mongoose, { Schema, Document, Model } from 'mongoose';

interface IDevice extends Document {
  deviceId: string;
  lastSeenAt: Date;
}

const DeviceSchema: Schema<IDevice> = new Schema({
  deviceId: String,
  lastSeenAt: Date,
  // Other device information if needed
});

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  loggedIn: Date | null;
  loggedOut: Date | null;
  devices: IDevice[];
}

const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  loggedIn: {
    type: Date,
    default: null
  },
  loggedOut: {
    type: Date,
    default: null
  },
  devices: [DeviceSchema]
});

const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
