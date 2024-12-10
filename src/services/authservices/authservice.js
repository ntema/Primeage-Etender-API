const User = require("../../models/userSchema");

const authservice = {
  async registerUser(data) {
    const registernewuser = new User(data);
    return await registernewuser.save();
  },
  async getUserbyId(id) {
    return await User.findById(id);
  },
  async getUserByEmail(email) {
    return await User.findOne(email).select('+password');
  },
  async findUserAndUpdate(id) {
    return await User.findOneAndUpdate(id);
  },
};

module.exports = authservice;
