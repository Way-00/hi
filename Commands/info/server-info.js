const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
  ChannelType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Get info of a Server")
    .setDMPermission(false),

  async execute(interaction, client) {
    const { guild, message } = interaction;

    const {
      createdTimestamp,
      ownerId,
      memberCount,
      members,
      emojis,
      roles,
      stickers,
      channels,
    } = guild;
    await members.fetch(); // adding members to the cache

    const icon = guild.iconURL(); // Icon Of Server
    const totEmoji = emojis.cache.map((e) => e.toString()) || "None"; // All Emojis Of Server
    const totBot = members.cache.filter((member) => member.user.bot).size; // All Bots Of Server

    const serverinfoEmbed = new EmbedBuilder()
      .setColor("Random")
      .setAuthor({
        name: `${guild.name} Info`,
        iconURL: icon,
      })
      .setThumbnail(icon)
      // Info About Server
      .addFields(
        { name: `**Server Name**:`, value: guild.name, inline: true },
        { name: `**Server ID:**`, value: guild.id, inline: true },
        { name: `**Server Owner:**`, value: `<@${ownerId}>`, inline: true },
        {
          name: `**Server Created:**`,
          value: `<t:${parseInt(createdTimestamp / 1000)}:R>`,
          inline: true,
        },
        {
          name: `**Members in the Server:**`,
          value: `${memberCount}`,
          inline: true,
        },
        { name: `\u200B`, value: `\u200B`, inline: true },
        {
          name: `**Boost Count:**`,
          value: `${guild.premiumSubscriptionCount}`,
          inline: true,
        },
        {
          name: `**Boost Tier:**`,
          value: `${guild.premiumTier}`,
          inline: true,
        },
        { name: `\u200B`, value: `\u200B`, inline: true },
        {
          name: `**Emojis in the Server:**`,
          value: `${emojis.cache.size}\nAnimated: ${
            emojis.cache.filter((emoji) => emoji.animated).size
          }\nNormal: ${emojis.cache.filter((emoji) => !emoji.animated).size}`,
          inline: true,
        },
        { name: `**Emojis:**`, value: `${totEmoji}`, inline: true },
        {
          name: `Stickers in the Server:`,
          value: `${stickers.cache.size}`,
          inline: true,
        },
        {
          name: `**Roles in the Server:**`,
          value: `${roles.cache.size - 1}`,
          inline: true,
        },
        { name: `**Highest role:**`, value: `${roles.highest}`, inline: true },
        { name: `**Bots:**`, value: `${totBot}`, inline: true },
        {
          name: `**Server Stats:**`,
          value: `Total: ${channels.cache.size}\n${
            channels.cache.filter(
              (channel) => channel.type === ChannelType.GuildText
            ).size
          } ⌨️\n${
            channels.cache.filter(
              (channel) => channel.type === ChannelType.GuildVoice
            ).size
          } 🔈\n${
            channels.cache.filter(
              (channel) => channel.type === ChannelType.GuildAnnouncement
            ).size
          } 📢\n${
            channels.cache.filter(
              (channel) => channel.type === ChannelType.GuildCategory
            ).size
          } 📁`,
        } // You Can Add More Options
      )
      .setFooter({
        text: guild.name,
        iconURL: icon,
      });

    await interaction.deferReply({ fetchReply: true });
    await interaction.editReply({ embeds: [serverinfoEmbed] });
  },
};
