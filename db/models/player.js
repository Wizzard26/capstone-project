import mongoose from "mongoose";
const { Schema } = mongoose;

const playerSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  nickname: {
    type: String
  },
  birthday: {
    type: String
  },
  nationality: {
    type: String
  },
  postcode: {
    type: String
  },
  city: {
    type: String
  },
  street: {
    type: String
  },
  streetnumber: {
    type: String
  },
  countryCode: {
    type: String
  },
  country: {
    type: String
  },
  state: {
    type: String
  },
  longitude: {
    type: String
  },
  latitude: {
    type: String
  },
  handiness: {
    type: String
  },
  darts: {
    type: String
  },
  description: {
    type: String
  },
  playerImage: {
    type: String
  },
  worldRanking: {
    type: Number
  },
  titles: {
    type: Array
  },
  user: {
    type: String,
    ref: 'User'
  }
});

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player;