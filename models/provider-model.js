const mongoose = require('mongoose')
const Schema = mongoose.Schema

const providerSchema = new Schema({
  name: String
})

const Provider = mongoose.model('provider', providerSchema)

module.exports = Provider
