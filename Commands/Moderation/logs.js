const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");

const warnSchema = require("../../models/warnSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("logs")
    .setDescription("Get the logs of a User.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subCmd) =>
      subCmd
        .setName("warns")
        .setDescription("Get the warns of a User.")
        .addUserOption((option) => {
          return option
            .setName("user")
            .setDescription("User to get the warn logs for.")
            .setRequired(true);
        })
        .addIntegerOption((option) => {
          return option
            .setName("page")
            .setDescription("The page to display if there are more than 1.")
            .setMinValue(2)
            .setMaxValue(20);
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
        PermissionsBitField.Flags.Administrator
      )
    ) {
      return await interaction.reply({
        content: "You do not have the permissions to do that.",
        ephemeral: true,
      });
    }
    switch (interaction.options.getSubcommand()) {
      case "warns":
        {
          const user = interaction.options.getUser("user");
          const page = interaction.options.getInteger("page");

          const userWarnings = await warnSchema.find({
            userId: user.id,
            guildId: interaction.guild.id,
          });

          if (!userWarnings?.length)
            return interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle("User Warn Logs")
                  .setDescription(`${user} has no warn logs`)
                  .setColor("Red"),
              ],
              ephemeral: true,
            });

          const embed = new EmbedBuilder()
            .setTitle(`${user.tag}'s warn logs`)
            .setColor("Random");

          if (page) {
            const pageNum = 5 * page - 5;

            if (userWarnings.length >= 6) {
              embed.setFooter({
                text: `page ${page} of ${Math.ceil(userWarnings.length / 5)}`,
              });
            }

            for (const warnings of userWarnings.splice(pageNum, 5)) {
              const moderator = interaction.guild.members.cache.get(
                warnings.moderator
              );

              embed.addFields({
                name: `id: ${warnings._id}`,
                value: `
                Moderator: ${moderator || "Moderator left"}
                     User: ${warnings.userId}
                     Reason: \`${warnings.warnReason}\`
                    ${warnings.warnDate}
                    `,
              });
            }

            return await interaction.reply({ embeds: [embed] });
          }

          if (userWarnings.length >= 6) {
            embed.setFooter({
              text: `page 1 of ${Math.ceil(userWarnings.length / 5)}`,
            });
          }

          for (const warns of userWarnings.slice(0, 5)) {
            const moderator = interaction.guild.members.cache.get(
              warns.moderator
            );

            embed.addFields({
              name: `id: ${warns._id}`,
              value: `
                  Moderator: ${moderator || "Moderator left"}
                  User: ${warns.userId}
                  Reason: \`${warns.warnReason}\`
                  Date: ${warns.warnDate}
                  `,
            });
          }

          await interaction.reply({ embeds: [embed] });
        }
        break;

      default:
        break;
    }
  },
};
