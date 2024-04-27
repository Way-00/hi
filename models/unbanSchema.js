const { Schema, model } = require("mongoose");

const unbanSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  userId: String,
  unbanReason: String,
  unbanDate: String,
  moderator: String,
});

module.exports = model("unbaningSchema", unbanSchema, "userUnbans");
