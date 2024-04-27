const { Schema, model } = require("mongoose");

const tempbanSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  userId: String,
  warnReason: String,
  warnDate: String,
  moderator: String,
});

module.exports = model("tempbanningSchema", tempbanSchema, "userTempbans");
