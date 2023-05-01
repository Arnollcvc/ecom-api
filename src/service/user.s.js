import User from "../models/User.js";

const getUser = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (e) {
    // console.log(e.stack);
    return false;
  }
}

const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (e) {
    // console.log(e.stack);
    return false;
  }
}


export default {
  getUser,
  getUsers,
}