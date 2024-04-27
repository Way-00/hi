const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tickle") // Name Of Slash Command
    .setDescription("Tickle someone!")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user you want to tickle.").setRequired(true)
    ),

    async execute(interaction){
        const user = interaction.options.getUser("user")
        
        const gifs = 
        [
        'https://nekos.best/api/v2/tickle/e41170df-1add-48a7-bbc4-d7ed97c1e162.gif',
        'https://nekos.best/api/v2/tickle/43b51ee2-5552-44ca-b441-a15ba5bef11b.gif',
        'https://nekos.best/api/v2/tickle/2b1db32f-44fa-4c6e-8109-cb16ac33b774.gif',
        'https://nekos.best/api/v2/tickle/0ad197d2-b5df-4670-9fb9-e84a2cb9010d.gif',
        'https://nekos.best/api/v2/tickle/1381df6d-0140-4409-a828-727e3fb89def.gif',
        'https://nekos.best/api/v2/tickle/79e16f98-8090-4cb2-89ca-827ba633f00d.gif',
        'https://nekos.best/api/v2/tickle/2463bd5c-de89-4d91-bdd7-711a0013f041.gif',
        'https://nekos.best/api/v2/tickle/a10ad074-9c52-4134-baeb-2100ae61efec.gif',
        'https://nekos.best/api/v2/tickle/2463bd5c-de89-4d91-bdd7-711a0013f041.gif',
        'https://nekos.best/api/v2/tickle/0a279aaa-b645-43a9-bbfe-a6f3b6f472a5.gif',
        'https://nekos.best/api/v2/tickle/52af577c-cd60-4a2f-b046-0833c631c8b2.gif',
        'https://nekos.best/api/v2/tickle/6f4bf37f-7158-40af-8f00-e561b8888a44.gif'
        ]

        const random = Math.floor(Math.random() * gifs.length);

        const tickleEmbed = new EmbedBuilder()
        .setTitle('Tickle!')
        .setDescription(`${interaction.member} just tickled ${user}!`)
        .setImage(gifs[random])
    
        interaction.reply({embeds: [tickleEmbed]})
    }

   
};