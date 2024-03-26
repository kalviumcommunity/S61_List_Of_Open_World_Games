const Joi = require("joi");

const EntitySchema = Joi.object({
  gameTitle: Joi.string().required(),
  publishedBy: Joi.string().required(),
  yearOfRelease: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
  availablePlatforms: Joi.string().required(),
  genre: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = EntitySchema;
