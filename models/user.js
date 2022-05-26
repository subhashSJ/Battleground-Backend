import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
  },
  github: {
    type: String,
  },
  bio: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
