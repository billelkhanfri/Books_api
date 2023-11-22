const mongoose = require("mongoose");
const Joi = require("joi");

const AuthorSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    image: {
      type: String,
      default: "default-avatar.png",
    },
  },
  {
    timestamps: true,
  }
);
const Author = mongoose.model("Author", AuthorSchema);

function validateCreateAuthor(obj) {
  const schema = Joi.object({
    first_name: Joi.string().trim().min(2).max(200).required(),
    last_name: Joi.string().trim().min(2).max(200).required(),
    nationality: Joi.string().trim().min(2).max(100).required(),
    image: Joi.string(),
  });
  return schema.validate(obj);
}

function validateUpdateAuthor(obj) {
  const schema = Joi.object({
    first_name: Joi.string().trim().min(2).max(200),
    last_name: Joi.string().trim().min(2).max(200),
    nationality: Joi.string().trim().min(2).max(200),
    image: Joi.string(),
  });
  return schema.validate(obj);
}
module.exports = {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
};
