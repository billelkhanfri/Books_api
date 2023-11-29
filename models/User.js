const mongoose = require("mongoose");
const Joi = require("joi");

// User Schema

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// User model
const User = mongoose.model("User", userSchema);

// Validate register user
function validateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    username: Joi.string().trim().min(2).max(100).required(),
    password: Joi.string().trim().min(6).required(),
    isAdmin: Joi.bool(),
  });
  return schema.validate(obj);

  // validate Login User
}
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(6).required(),
  });
  return schema.validate(obj);
}

// validate Update User

function validateUpdaterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).email(),
    username: Joi.string().trim().min(2).max(100),
    password: Joi.string().trim().min(6),
    isAdmin: Joi.bool(),
  });
  return schema.validate(obj);
}
module.exports = {
  User,
  validateRegisterUser,
  validateUpdaterUser,
  validateLoginUser,
};
