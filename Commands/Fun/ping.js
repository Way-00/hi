const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping") // Name Of Slash Command
    .setDescription("Ping Command"), // Description Of Slash Command
  async execute(interaction, client) {
    const message = await interaction.deferReply({ fetchReply: true }); // .deferReply Will Make The Bot Think For A While Before Send Response
    const pingmsg = `:ping_pong: Pong! Latency is ${
      message.createdTimestamp - interaction.createdTimestamp
    }ms. Bot Latency is ${client.ws.ping}ms.`;
    await interaction.editReply(pingmsg);
  },
};
