const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  time,
  ChatInputCommandInteraction,
  PermissionsBitField,
} = require("discord.js");
const { Types } = require("mongoose");

const banSchema = require("../../models/banSchema");
const modSchema = require("../../models/modschema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a Member")
    // Seletcting User To Ban
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The User you want to ban.")
        .setRequired(true)
    )
    // Reason For Banning
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason of the ban.")
    )
    // Permission User Should Have To Use Command
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),

  async execute(interaction, client) {
    const { guild, member } = interaction;
    const user = interaction.options.getUser("target");
    const reason =
      interaction.options.getString("reason") ?? "No reason provided";
    const member_ = await interaction.guild.members.fetch(user.id);
    const banTime = time();

    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
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
        content: "You can't ban that user because they're the server owner.",
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
          "You can't ban that user because the have the same/higher role than you.",
        ephemeral: true,
      });
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.reply({
        content:
          "I can't ban that user because the have the same/higher role than me.",
        ephemeral: true,
      });
      return;
    }

    const newSchema = new banSchema({
      _id: new Types.ObjectId(),
      guildId: guild.id,
      userId: user.id,
      banReason: reason,
      moderator: member.user.id,
      banDate: banTime,
    });

    newSchema.save().catch((err) => console.log(err));

    const banEmbed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Ban")
      .setDescription(`Banned ${user.username} for ${reason}`);

    await interaction.reply({ embeds: [banEmbed], ephemeral: true });

    const modData = await modSchema.findOne({ guildId: guild.id });
    const data = await banSchema.findOne({
      guildId: guild.id,
      userId: user.id,
    });

    if (modData) {
      client.channels.cache.get(modData.channelId).send({
        embeds: [
          new EmbedBuilder().setTitle("New user banned").addFields(
            {
              name: "User banned",
              value: `<@${user.id}>`,
              inline: true,
            },
            {
              name: "Banned by",
              value: `<@${member.user.id}>`,
              inline: true,
            },
            {
              name: "Banned at",
              value: `${banTime}`,
              inline: true,
            },
            {
              name: "Ban ID",
              value: `\`${data._id}\``,
              inline: true,
            },
            {
              name: "Ban Reason",
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
            .setTitle(`You have been banned from: ${guild.name}`)
            .addFields(
              {
                name: "Banned for",
                value: `\`${reason}\``,
                inline: true,
              },
              {
                name: "Banned at",
                value: `${banTime}`,
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

    await member_.ban({ reason: reason });
  },
};
