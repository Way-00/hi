const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  time,
} = require("discord.js");
const { Types } = require("mongoose");

const warnSchema = require("../../models/warnSchema");
const modSchema = require("../../models/modschema");

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setName("warn")
    .setDescription("Warn a user or remove a warn")
    .addSubcommand((subCmd) =>
      subCmd
        .setName("add")
        .setDescription("Warn a user")
        .addUserOption((option) => {
          return option
            .setName("user")
            .setDescription("The user to warn")
            .setRequired(true);
        })
        .addStringOption((option) => {
          return option
            .setName("reason")
            .setDescription("The reason for the warn");
        })
    )
    .addSubcommand((subCmd) =>
      subCmd
        .setName("remove")
        .setDescription("Remove a warn from a user")
        .addStringOption((option) => {
          return option
            .setName("warn_id")
            .setDescription("The id of the warn to remove")
            .setRequired(true);
        })
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ModerateMembers
      )
    ) {
      return await interaction.reply({
        content: "You do not have the permissions to do that.",
        ephemeral: true,
      });
    }
    switch (interaction.options.getSubcommand()) {
      case "add":
        {
          const { options, guild, member } = interaction;
          const user = options.getUser("user");
          const reason = options.getString("reason");
          const warnTime = time();

          const newSchema = new warnSchema({
            _id: new Types.ObjectId(),
            guildId: guild.id,
            userId: user.id,
            warnReason: reason,
            moderator: member.user.id,
            warnDate: warnTime,
          });

          newSchema.save().catch((err) => console.log(err));

          await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("User warned!")
                .setDescription(
                  `<@${user.id}> has been warned for \`${reason}\`!`
                )
                .setColor("Red"),
            ],
            ephemeral: true,
          });

          const modData = await modSchema.findOne({ guildId: guild.id });
          const data = await warnSchema.findOne({
            guildId: guild.id,
            userId: user.id,
          });

          if (modData) {
            client.channels.cache.get(modData.channelId).send({
              embeds: [
                new EmbedBuilder().setTitle("New user warned").addFields(
                  {
                    name: "User warned",
                    value: `<@${user.id}>`,
                    inline: true,
                  },
                  {
                    name: "Warned by",
                    value: `<@${member.user.id}>`,
                    inline: true,
                  },
                  {
                    name: "Warned at",
                    value: `${warnTime}`,
                    inline: true,
                  },
                  {
                    name: "Warn ID",
                    value: `\`${data._id}\``,
                    inline: true,
                  },
                  {
                    name: "Warn Reason",
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
                  .setTitle(`You have been warned in: ${guild.name}`)
                  .addFields(
                    {
                      name: "Warned for",
                      value: `\`${reason}\``,
                      inline: true,
                    },
                    {
                      name: "Warned at",
                      value: `${warnTime}`,
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
        }
        break;

      case "remove": {
        const warnId = interaction.options.getString("warn_id");

        const data = await warnSchema.findByIdAndDelete(warnId);

        const err = new EmbedBuilder().setDescription(
          `No warn Id watching \`${warnId}\` was found!`
        );

        if (!data) return await interaction.reply({ embeds: [err], ephemeral: true, });

        const embed = new EmbedBuilder()
          .setTitle("Remove Infraction")
          .setDescription(
            `Successfully removed the warn with the ID matching ${warnId}`
          );
        return await interaction.reply({ embeds: [embed], ephemeral: true, });
      }
    }
  },
};
