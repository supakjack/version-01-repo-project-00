const { authLoginSchema } = require('../helpers/validation_schema')
const { accountModel } = require("../models/accountModel");

module.exports = {
    login: async (req, res, next) => {
        try {
          const result = await authLoginSchema.validateAsync(req.body);
          const doesExist = await accountModel.findOne(result);
          const data = doesExist
          res.status(200).send({ data });
        } catch (error) {
          next(error);
        }
    }
};