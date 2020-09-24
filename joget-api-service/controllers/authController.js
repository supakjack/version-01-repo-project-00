const { authLoginSchema } = require('../helpers/validation_schema')
module.exports = {
    login: async (req, res, next) => {
        try {
          const result = await authLoginSchema.validateAsync(req.body);
          const data = result
          res.status(200).send({ data });
        } catch (error) {
          next(error);
        }
    }
};