const {
  Client,
  GatewayIntentBits,
  Collection,
  PermissionsBitField,
  Permissions,
  MessageManager,
  Guild,
} = require("discord.js");
const fs = require("fs");
const mongo = require("mongoose");
const {token } = require('./config.json')




const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const {
  Events,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
} = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");

client.commands = new Collection();
client.commandArray = [];

const funtionFolders = fs.readdirSync("./src/functions");
for (const folder of funtionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js")); // Read Folders
  for (const file of functionFiles)
    require(`./src/functions/${folder}/${file}`)(client); // Read Files
}

client.handleCommands();
client.handleEvents();
client.login(token);

const ticketSchema = require("./models/ticketSchema");
const internal = require("stream");
const { close } = require("inspector");

client.on(Events.InteractionCreate, async (interaction) => {
  const { customId, guild, channel } = interaction;
  if (interaction.isButton()) {
    if (customId === "ticket") {
      let data = await ticketSchema.findOne({
        GuildID: interaction.guild.id,
      });

      if (!data)
        return await interaction.reply({
          content: `Ticket system is not setup in this server.`,
          ephemeral: true,
        });

      const role = guild.roles.cache.get(data.Role);
      const cate = data.Category;
      const posChannel = interaction.guild.channels.cache.find(
        (c) =>
          c.topic && c.topic.includes(` Ticket Owner: ${interaction.user.id}`)
      );

      if (posChannel) {
        return await interaction.reply({
          content: `You already have a ticket open: <#${posChannel.id}>`,
          ephemeral: true,
        });
      }

      await interaction.guild.channels
        .create({
          name: `ticket-${interaction.user.username}`,
          parent: cate,
          type: ChannelType.GuildText,
          topic: `Ticket Owner: ${interaction.user.id}`,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: ["ViewChannel"],
            },
            {
              id: role.id,
              allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"],
            },
            {
              id: interaction.member.id,
              allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"],
            },
          ],
        })
        .then(async (channel) => {
          const openEmbed = new EmbedBuilder()
            .setColor("#00c7fe")
            .setTitle("Ticket Opened")
            .setDescription(
              `Welcome to your ticket **${interaction.user.username}**\nReact with 🔒 to close the ticket`
            )
            .setThumbnail(interaction.guild.iconURL())
            .setTimestamp()
            .setFooter({ text: `${interaction.guild.name}'s Tickets` });

          const closeButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("closeticket")
              .setLabel("Close")
              .setStyle(ButtonStyle.Danger)
              .setEmoji("🔒")
          );

          await channel.send({
            content: `<@&${role.id}>`,
            embeds: [openEmbed],
            components: [closeButton],
          });

          const openTicket = new EmbedBuilder().setDescription(
            `Ticket created in <#${channel.id}>`
          );

          await interaction.reply({ embeds: [openTicket], ephemeral: true });
        });
    }

    if (customId === "closeticket") {
      const closingEmbed = new EmbedBuilder()
        .setDescription("🔐 Are you sure you want to close this ticket?")
        .setColor("DarkRed");

      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("yesclose")
          .setLabel("Yes")
          .setStyle(ButtonStyle.Danger)
          .setEmoji("✅"),

        new ButtonBuilder()
          .setCustomId("nodont")
          .setLabel("No")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji("❌")
      );

      await interaction.reply({
        embeds: [closingEmbed],
        components: [buttons],
      });
    }

    if (customId === "yesclose") {
      let data = await ticketSchema.findOne({ GuildID: interaction.guild.id });
      const transcript = await createTranscript(channel, {
        limit: -1,
        returnBuffer: false,
        filename: `ticket-${interaction.user.username}.html`,
      });

      const transcriptEmbed = new EmbedBuilder()
        .setAuthor({
          name: `${interaction.guild.name}'s Transcripts`,
          iconURL: guild.iconURL(),
        })
        .addFields({ name: "Closed by", value: `${interaction.user.tag}` })
        .setColor("Red")
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL())
        .setFooter({ text: `${interaction.guild.name}'s Tickets` });

      const processEmbed = new EmbedBuilder()
        .setDescription(`Closing ticket in 10 seconds...`)
        .setColor("Red");

      await interaction.reply({ embeds: [processEmbed] });

      await guild.channels.cache.get(data.Logs).send({
        embeds: [transcriptEmbed],
        files: [transcript],
      });
      setTimeout(() => {
        interaction.channel.delete();
      }, 10000);
    }

    if (customId === "nodont") {
      const noEmbed = new EmbedBuilder()
        .setDescription("Ticket close cancelled")
        .setColor("Red");

      await interaction.reply({ embeds: [noEmbed], ephemeral: true });
    }
  }
});
