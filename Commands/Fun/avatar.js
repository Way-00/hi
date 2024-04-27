const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Shows a user avatar.")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user you want the image of.")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const avatarEmbed = new EmbedBuilder()
      .setColor("Aqua")
      .setImage(
        user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
      );

    await interaction.reply({ embeds: [avatarEmbed], ephemeral: true });
  },
};
