const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Url = new Schema({
  name: {
    type: String,
  },

  rawUrl: {
    type: String
    required: true
  },
})


