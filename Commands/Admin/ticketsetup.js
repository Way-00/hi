const {
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionsBitField,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ChannelType,
  PermissionFlagsBits
} = require("discord.js");

const ticketSchema = require("../../models/ticketSchema");
const { execute } = require("./setwelcome");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket-setup")
    .setDescription("Setup the ticket system for the server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel where you want the ticket panel.")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addChannelOption((option) =>
      option
        .setName("category")
        .setDescription("The category to create the ticket channels in ")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to ping when a ticket is created.")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("ticket-logs")
        .setDescription("The channel for the transcripts to be sent to.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("The description for the ticket system.")
        .setRequired(true)
        .setMinLength(1)
        .setMaxLength(1000)
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("The color for the ticket panel.")
        .addChoices(
          { name: "Red", value: "Red" },
          { name: "Blue", value: "Blue" },
          { name: "Green", value: "Green" },
          { name: "Yellow", value: "Yellow" },
          { name: "Purple", value: "Purple" },
          { name: "Pink", value: "DarkVividPink" },
          { name: "Orange", value: "Orange" },
          { name: "White", value: "White" },
          { name: "Gray", value: "Gray" }
        )
        .setRequired(true)
    ),

  async execute(interaction, client) {
    try {
      const { options, guild } = interaction;
      const color = options.getString("color");
      const msg = options.getString("description");
      const GuildID = interaction.guild.id;
      const panel = options.getChannel("channel");
      const category = options.getChannel("category");
      const role = options.getRole("role");
      const logs = options.getChannel("ticket-logs");

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
      const data = await ticketSchema.findOne({ GuildID: GuildID });
      if (data)
        return await interaction.reply({
          content: `You already have a ticket system setup.`,
          ephemeral: true,
        });
      else {
        await ticketSchema.create({
          GuildID: GuildID,
          Channel: panel.id,
          Category: category.id,
          Role: role.id,
          Logs: logs.id,
        });

        const setupticketEmbed = new EmbedBuilder()
          .setColor(`${color}`)
          .setTimestamp()
          .setTitle("Ticket Panel")
          .setDescription(`${msg}`);

        const button = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("ticket")
            .setLabel("Create Ticket")
            .setStyle(ButtonStyle.Secondary)
        );

        const channel = client.channels.cache.get(panel.id);
        await channel.send({
          embeds: [setupticketEmbed],
          components: [button],
        });

        await interaction.reply({
          content: `The ticket panel has been setup to ${channel}.`,
          ephemeral: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  },
};
