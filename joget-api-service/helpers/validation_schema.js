const joi = require('@hapi/joi')

const authLoginSchema = joi.object({
  name: joi.string().required(),
  role: joi.string().required()
})

const accountSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  name: joi.string().required(),
  url: joi.string().required(),
  role: joi.string().required(),
})

const idSchema = joi.object({
  id: joi.string().required()
})

module.exports = {
  authLoginSchema,
  accountSchema,
  idSchema
}
