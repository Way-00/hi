const { Schema, model } = require("mongoose");

const kickSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  userId: String,
  kickReason: String,
  kickDate: String,
  moderator: String,
});

module.exports = model("kickingSchema", kickSchema, "userKicks");
