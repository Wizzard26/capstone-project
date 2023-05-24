import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User