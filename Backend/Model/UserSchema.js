const mongoose = require("mongoose");
const crypto = require("crypto");

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  salt: String,
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = crypto.randomBytes(16).toString("hex");
  user.password = hashPassword(user.password, salt);
  user.salt = salt;

  next();
});

const User = mongoose.model("User", UserSchema);

const hashPassword = (password, salt) => {
  return crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
};

module.exports = {
  User,
  hashPassword,
};
