const { accountSchema, idSchema } = require("../helpers/validation_schema");
const { accountModel } = require("../models/accountModel");
const ObjectId = require("mongoose").Types.ObjectId;
const client = require("../helpers/init_redis");
module.exports = {
  getAccount: async (req, res, next) => {
    try {
      const result = await idSchema.validateAsync(req.query);
      client.GET(result.id, async (error, query) => {
        if (query) {
          return res.send(JSON.parse(query));
        }
        const doesExist = await accountModel.findOne({
          _id: new ObjectId(result.id),
        });
        const data = doesExist;
        console.log(data);
        client.SETEX(result.id, 600, JSON.stringify({data}));
        res.send({data});
      });
    } catch (error) {
      next(error);
    }
  },
  deleteAccount: async (req, res, next) => {
    try {
      const result = await idSchema.validateAsync(req.query);
      // client.GET(result.id, async (error, query) => {
      //   if (query) {
      //     res.send("ลบไปแล้ว");
      //     return;
      //   }
      const doesExist = await accountModel.findOneAndRemove({
        _id: new ObjectId(result.id),
      });
      const data = doesExist;
      // client.SET([result.id,data.username], JSON.stringify(data));
      res.status(204).send({ data });
      // });
    } catch (error) {
      next(error);
    }
  },
  addAccount: async (req, res, next) => {
    try {
      const result = await accountSchema.validateAsync(req.body);
      console.log(result);
      client.GET(result.username, async (error, query) => {
        if (query) {
          res.send("Username ซ้ำนะจ๊ะ");
          return;
        }
        console.log("ไม่บอก");
        const account = new accountModel(result);
        const saveAccount = await account.save();
        const data = saveAccount;
        client.SETEX(result.username, 600, JSON.stringify({data}));
        res.status(201).send({ data });
      });
    } catch (error) {
      next(error);
    }
  },
  updateAccount: async (req, res, next) => {
    try {
      const resultBody = await accountSchema.validateAsync(req.body);
      const resultQuery = await idSchema.validateAsync(req.query);
      const updateAccount = await accountModel.findByIdAndUpdate(
        new ObjectId(resultQuery.id),
        resultBody,
        { new: true }
      );
      const data = updateAccount;
      client.SETEX(resultQuery.id, 600, JSON.stringify({data}));
      res.status(200).send({ data });
    } catch (error) {
      next(error);
    }
  },
};
