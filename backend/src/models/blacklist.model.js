const mongoose = require('mongoose')

const blacklistSchema = new mongoose.Schema({
  token:{
    type: String,
    required: [ true, "token is require to bee added in blacklist"]
  }
}, {
  timestamps: true
})

const tokenBlacklistModel = mongoose.model("blacklistTokens", blacklistSchema)

module.exports = tokenBlacklistModel