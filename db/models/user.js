import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: [true, 'Please enter your name']},
  email: {
    type: String,
    required: [true, 'Please enter your e-mail']},
  password: {
    type: String,
    required: [true, 'Please enter your password']},
  avatar: {
    type: String,
    url: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  player: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User