const ticketSchema = require("../../models/ticketSchema");
const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
  PermissionFlagsBits
} = require("discord.js");
const { execute } = require("./setwelcome");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket-disable")
    .setDescription("Disable the ticket system for the server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction, client) {
    try {
      const GuildID = interaction.guild.id;

      if (
        !interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator
        )
      )
        return await interaction.reply({
          content: `You do not have permissions to use this command.`,
          ephemeral: true,
        });

      const ticketdisableEmbed = new EmbedBuilder()
        .setColor("#00c7fe")
        .setDescription(`Ticket system has been disabled already.`)
        .setTimestamp()
        .setAuthor({ name: `Ticket System` })
        .setFooter({ text: `Ticket System Disabled` });

      const data = await ticketSchema.findOne({ GuildID: GuildID });
      if (!data)
        return await interaction.reply({
          embeds: [ticketdisableEmbed],
          ephemeral: true,
        });

      await ticketSchema.findOneAndDelete({ GuildID: GuildID });

      const channel = client.channels.cache.get(data.Channel);
      if (channel) {
        await channel.messages.fetch({ limit: 1 }).then(messages => {
          const lastMessage = messages.first();
          if (lastMessage.author.id === client.user.id) {
            lastMessage.delete();
          }
        });
      }

      const disabledTicketEmbed = new EmbedBuilder()
        .setColor("#00c7fe")
        .setDescription("Ticket System has been disabled.")
        .setTimestamp()
        .setAuthor({ name: `Ticket System` })
        .setFooter({ text: `Ticket System Disabled` });

      await interaction.reply({
        embeds: [disabledTicketEmbed],
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);
    }
  },
};
