const { authLoginSchema } = require("../helpers/validation_schema");
const { accountModel } = require("../models/accountModel");
const client = require("../helpers/init_redis");

module.exports = {
  login: async (req, res, next) => {
    try {
      const result = await authLoginSchema.validateAsync(req.body);
      client.GET(result.name, async (error, query) => {
        if (query) {
          return res.send(JSON.parse(query));
        }
      const doesExist = await accountModel.findOne(result);
      const data = doesExist;
      client.SETEX(data.name, 600, JSON.stringify({data}));
      res.status(200).send({ data });
      });
    } catch (error) {
      next(error);
    }
  },
};
