import mongoose from "mongoose";
import { User } from "../types/user.types";

const userSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password should be of atleast 6 characters"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model<User>("users", userSchema);

export default User;
