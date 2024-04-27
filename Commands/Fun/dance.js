const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dance") // Name Of Slash Command
    .setDescription("Dance with happiness!"),
  async execute(interaction) {

    const gifs = [
      "https://nekos.best/api/v2/dance/c86f2bb8-d27a-4297-930c-5da611645be2.gif",
      "https://nekos.best/api/v2/dance/fe1e4db8-68ff-4d66-be9b-572daad1a475.gif",
      "https://nekos.best/api/v2/dance/977076cd-27a4-4e52-978e-594646d36498.gif",
      "https://nekos.best/api/v2/dance/8fae6617-3dd8-4711-841a-1bd406e55237.gif",
      "https://nekos.best/api/v2/dance/2cc51c2d-745c-4e6e-866d-80d01f31712e.gif",
      "https://nekos.best/api/v2/dance/6a484481-16a9-45fe-882c-2633254ba300.gif",
      "https://nekos.best/api/v2/dance/842e63de-33c2-436d-9002-6e3bf7906286.gif",
      "https://nekos.best/api/v2/dance/5304c19a-dbb5-4a68-a88e-c5f9705ab67e.gif",
      "https://nekos.best/api/v2/dance/4b43019f-b9e4-4478-97d9-5db62dd05578.gif",
      "https://nekos.best/api/v2/dance/c0b459d6-cd9b-4db1-99a7-f5feb3b7b20c.gif",
      "https://nekos.best/api/v2/dance/52b1e250-a89c-4c65-93ac-d490d54c700a.gif",
      "https://nekos.best/api/v2/dance/e4a4bf5d-6c20-4d00-9f1b-32dca11d7d1b.gif",
    ];

    const random = Math.floor(Math.random() * gifs.length);

    const danceEmbed = new EmbedBuilder()
      .setTitle("Dance!")
      .setDescription(`${interaction.member} is dancing, let's dance all together!`)
      .setImage(gifs[random]);

    interaction.reply({ embeds: [danceEmbed] });
  },
};
