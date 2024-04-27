const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  time,
  ChatInputCommandInteraction,
  PermissionsBitField,
} = require("discord.js");
const { Types } = require("mongoose");

const kickSchema = require("../../models/kickSchema");
const modSchema = require("../../models/modschema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a Member")
    // Seletcting User To Kick
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The User you want to kick")
        .setRequired(true)
    )
    // Reason For Kicking
    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason for the kick")
    )
    // Permission User Should Have To Use Command
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false),

  async execute(interaction, client) {
    const { guild, member } = interaction;
    const user = interaction.options.getUser("target");
    const reason =
      interaction.options.getString("reason") ?? "No reason provided";
    const member_ = await interaction.guild.members.fetch(user.id);
    const kickTime = time();

    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)
    ) {
      return await interaction.reply({
        content: "You do not have the permissions to do that.",
        ephemeral: true,
      });
    }

    const targetUser = await interaction.guild.members.fetch(user);

    if (!targetUser) {
      await interaction.reply({
        content: "That user doesn't exist in this server.",
        ephemeral: true,
      });
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.reply({
        content: "You can't kick that user because they're the server owner.",
        ephemeral: true,
      });
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position;
    const requestUserRolePosition = interaction.member.roles.highest.position;
    const botRolePosition = interaction.guild.members.me.roles.highest.position;

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.reply({
        content:
          "You can't kick that user because the have the same/higher role than you.",
        ephemeral: true,
      });
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.reply({
        content:
          "I can't kick that user because the have the same/higher role than me.",
        ephemeral: true,
      });
      return;
    }

    const newSchema = new kickSchema({
      _id: new Types.ObjectId(),
      guildId: guild.id,
      userId: user.id,
      kickReason: reason,
      moderator: member.user.id,
      kickDate: kickTime,
    });

    newSchema.save().catch((err) => console.log(err));

    const kickEmbed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Kick")
      .setDescription(`Kicked ${user.username} for ${reason}`);

    await interaction.reply({ embeds: [kickEmbed], ephemeral: true });

    const modData = await modSchema.findOne({ guildId: guild.id });
    const data = await kickSchema.findOne({
      guildId: guild.id,
      userId: user.id,
    });

    if (modData) {
      client.channels.cache.get(modData.channelId).send({
        embeds: [
          new EmbedBuilder().setTitle("New user kicked").addFields(
            {
              name: "User kicked",
              value: `<@${user.id}>`,
              inline: true,
            },
            {
              name: "Kicked by",
              value: `<@${member.user.id}>`,
              inline: true,
            },
            {
              name: "Kicked at",
              value: `${kickTime}`,
              inline: true,
            },
            {
              name: "Kick ID",
              value: `\`${data._id}\``,
              inline: true,
            },
            {
              name: "Kick Reason",
              value: `\`\`\`${reason}\`\`\``,
            }
          ),
        ],
      });
    }
    user
      .send({
        embeds: [
          new EmbedBuilder()
            .setTitle(`You have been kicked from: ${guild.name}`)
            .addFields(
              {
                name: "Kicked for",
                value: `\`${reason}\``,
                inline: true,
              },
              {
                name: "Kicked at",
                value: `${kickTime}`,
                inline: true,
              }
            )
            .setColor("#2f3136"),
        ],
      })
      .catch(async (err) => {
        console.log(err);
        await interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setTitle("User has dms disabled so no DM was sent.")
              .setColor("Red"),
          ],
          ephemeral: true,
        });
      });

    await member_.kick({ reason: reason });
  },
};
