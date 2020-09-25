const mongoose = require('mongoose')
const schema = mongoose.Schema

const accountSchema = new schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  }
})

const accountModel = mongoose.model('account', accountSchema)
module.exports = {
  accountModel,
  accountSchema
}
