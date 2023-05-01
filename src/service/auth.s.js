import jwt from "jsonwebtoken";
import config from "../config/api.js";

export const generateToken = (user) => {
  try {
    return jwt.sign({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user?.isAdmin || false,
      isMod: user?.isMod || false,
    },
    config.JWT_SECRET, { expiresIn: `${config.JWT_EXPIRE}` });
  } catch (e) {
    // console.log(e.stack)
    return false;
  }
}