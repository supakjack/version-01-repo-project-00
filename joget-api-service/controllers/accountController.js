const { accountSchema, idSchema } = require("../helpers/validation_schema");
const { accountModel } = require("../models/accountModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  getAccount: async (req, res, next) => {
    try {
      const result = await idSchema.validateAsync(req.query);
      const doesExist = await accountModel.findOne({
        _id: new ObjectId(result.id),
      });
      const data = doesExist;
      res.send({ data });
    } catch (error) {
      next(error);
    }
  },
  deleteAccount: async (req, res, next) => {
    try {
      const result = await idSchema.validateAsync(req.query);
      const doesExist = await accountModel.findOneAndRemove({
        _id: new ObjectId(result.id),
      });
      const data = doesExist;
      res.status(204).send({ data });
    } catch (error) {
      next(error);
    }
  },
  addAccount: async (req, res, next) => {
    try {
      const result = await accountSchema.validateAsync(req.body);
      const account = new accountModel(result);
      const saveAccount = await account.save();
      const data = saveAccount;
      res.status(201).send({ data });
    } catch (error) {
      next(error);
    }
  },
  updateAccount: async (req, res, next) => {
    try {
      const resultBody = await accountSchema.validateAsync(req.body);
      const resultQuery = await idSchema.validateAsync(req.query);
      const updateAccount = await accountModel.findByIdAndUpdate(new ObjectId(resultQuery.id),resultBody, {new: true})
      const data = updateAccount;
      res.status(200).send({ data });
    } catch (error) {
      next(error);
    }
  },
  // put: async (req, res) => {
  //   try {
  //     const resultBody = await accountSchema.validateAsync(req.body);
  //     const resultParams = await idSchema.validateAsync(req.params);
  //     Service.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
  //     if (err) return res.status(400).send(err);
  //     res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
  //   });
  // } catch (error){
  //   next(error);
  // }
};
