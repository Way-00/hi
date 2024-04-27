const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Gives info of a User.")
    // Seletcting User To Ban
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The User you want to get info of.")
        .setRequired(true)
    )
    // Permission User Should Have To Use Comman
    .setDMPermission(false),

  async execute(interaction, client) {
    const member = interaction.options.getMember("user") || interaction.member;

    const userInfoEmbed = new EmbedBuilder()
      .setColor("Random")
      .setAuthor({
        name: `${member.user.username} Info`,
        iconURL: member.user.displayAvatarURL(),
      })
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .addFields(
        {
          name: `**Username:**`,
          value: `${member.user.username}#${member.user.discriminator}`,
          inline: true,
        },
        { name: `**User ID:**`, value: member.user.id, inline: true },
        { name: `\u200B`, value: `\u200B`, inline: true },
        {
          name: `**Discord Created:**`,
          value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`,
          inline: true,
        },
        {
          name: `**Joined Server:**`,
          value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`,
          inline: true,
        },
        {
          name: `**Roles:**`,
          value: `${member.roles.cache.map((role) => role.toString())}`,
        }
      )
      .setFooter({ text: `${member.user.username} Info` });

    await interaction.deferReply({ fetchReply: true });
    await interaction.editReply({ embeds: [userInfoEmbed] });
  },
};
