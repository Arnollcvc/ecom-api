import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const modelo = new Schema({
  username: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  isAdmin: Boolean,
  isMod: Boolean,
  token: String,
  invalidTokens: Array,
  roles: [{
    ref: "Role",
    type: Schema.Types.ObjectId
  }]
}, {
  versionKey: false,
  timestamps: true,
});

modelo.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

modelo.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
}

export default model("User", modelo);