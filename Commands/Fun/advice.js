const { SlashCommandBuilder, EmbedBuilder } = require("discord.js"); // npm i discord.js
const axios = require("axios"); // npm i axios
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("advice") // Name Of Slash Command
    .setDescription("Get a random Advice") // Description Of Slash Command
    .setDMPermission(true),
  async execute(interaction, client) {
    await interaction.deferReply({ fetchReply: true }); // Defer Reply Until Bot Gets Advice From API

    const data = await axios("https://api.adviceslip.com/advice"); // Get Advice From the API

    try {
      const adviceEmbed = new EmbedBuilder()
        .setAuthor({
          name: `Advice`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp()
        .setColor("Random").setDescription(`
**Advice for you:**
${data.data.slip.advice}
            `);

      await interaction.editReply({ embeds: [adviceEmbed] });
    } catch (error) {
      // If Any Errors
      await interaction.editReply({
        content: `There was an error while getting an advice from API, try again later`,
        ephemeral: true,
      });
      await wait(6000);
      await interaction.deleteReply();
      console.log(error);
    }
  },
};
