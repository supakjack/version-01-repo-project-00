const { accountSchema, idSchema } = require('../helpers/validation_schema')
module.exports = {
  getAccount: async (req, res, next) => {
    try {
      const result = await idSchema.validateAsync(req.query)
      const data = result
      res.send({ data })
    } catch (error) {
      next(error)
    }
  },
  deleteAccount: async (req, res, next) => {
    try {
      const result = await idSchema.validateAsync(req.params)
      const data = result
      res.status(204).send({ data })
    } catch (error) {
      next(error)
    }
  },
  addAccount: async (req, res, next) => {
    try {
      const result = await accountSchema.validateAsync(req.body)
      const data = result
      res.status(201).send({ data })
    } catch (error) {
      next(error)
    }
  },
  updateAccount: async (req, res, next) => {
    try {
      const resultBody = await accountSchema.validateAsync(req.body)
      const resultParams = await idSchema.validateAsync(req.params)
      const result = { 'req.body': resultBody, 'req.params': resultParams }
      const data = result
      res.status(200).send({ data })
    } catch (error) {
      next(error)
    }
  }
}
