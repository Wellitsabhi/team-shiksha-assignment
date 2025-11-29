import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
  email: string;
  name?: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, default: "" },
  password: { type: String, required: true }
}, { timestamps: true });

export default (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);
