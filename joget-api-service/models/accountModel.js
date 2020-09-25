const mongoose = require("mongoose");
const { encode } = require("js-base64");
const schema = mongoose.Schema;

const accountSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

accountSchema.pre("save", async function (next) {
  try {
    console.log(this.password);
    this.password = await encode(this.password);
    console.log(this.password);
  } catch (error) {
    next(error);
  }
});

accountSchema.pre("findOneAndUpdate", async function (next) {
  try {
    this._update.password = await encode(this._update.password);
  } catch (error) {
    next(error);
  }
});

const accountModel = mongoose.model("account", accountSchema);
module.exports = {
  accountModel,
  accountSchema,
};
