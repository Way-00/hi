const { Schema, model } = require("mongoose");

const banSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  userId: String,
  banReason: String,
  banDate: String,
  moderator: String,
});

module.exports = model("banningSchema", banSchema, "userBans");
