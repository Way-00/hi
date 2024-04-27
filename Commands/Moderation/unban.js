const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  time,
  ChatInputCommandInteraction,
  PermissionsBitField,
} = require("discord.js");
const { Types } = require("mongoose");

const unbanSchema = require("../../models/unbanSchema");
const modSchema = require("../../models/modschema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a Member")
    // Seletcting User To UnBan
    .addStringOption((option) =>
      option
        .setName("userid")
        .setDescription("The User ID you want to unban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for unbanning the User.")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),

  async execute(interaction, client) {
    const { guild, member } = interaction;
    const user = interaction.options.getString("userid");

    const reason =
      interaction.options.getString("reason") ?? "No reason provided";
    const unbanTime = time();

    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    ) {
      return await interaction.reply({
        content: "You do not have the permissions to do that.",
        ephemeral: true,
      });
    }

    const newSchema = new unbanSchema({
      _id: new Types.ObjectId(),
      guildId: guild.id,
      userId: user.id,
      unbanReason: reason,
      moderator: member.user.id,
      unbanDate: unbanTime,
    });

    newSchema.save().catch((err) => console.log(err));

    const modData = await modSchema.findOne({ guildId: guild.id });
    const data = await unbanSchema.findOne({
      guildId: guild.id,
      userId: user.id,
    });

    if (modData) {
      client.channels.cache.get(modData.channelId).send({
        embeds: [
          new EmbedBuilder().setTitle("New user unbanned").addFields(
            {
              name: "User unbanned",
              value: `<@${user.id}>`,
              inline: true,
            },
            {
              name: "Unbanned by",
              value: `<@${member.user.id}>`,
              inline: true,
            },
            {
              name: "Unbanned at",
              value: `${unbanTime}`,
              inline: true,
            },
            {
              name: "Unban ID",
              value: `\`${data._id}\``,
              inline: true,
            },
            {
              name: "Unban Reason",
              value: `\`\`\`${reason}\`\`\``,
            }
          ),
        ],
      });
    }

    try {
      const unbanEmbed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Unban")
        .setDescription(`Unbanned succesfully ${user.id} for ${reason}`);

      await interaction.reply({ embeds: [unbanEmbed], ephemeral: true });
      await interaction.guild.members.unban(user);
    } catch (err) {
      const errorunbanEmbed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Unban Error")
        .setDescription(`Provide valid User ID`);

      await interaction.reply({ embeds: [errorunbanEmbed], ephemeral: true });
      console.log(err);
    }
  },
};
