const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hug") // Name Of Slash Command
    .setDescription("Give a hug to someone!")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user you want to give a hug.").setRequired(true)
    ),

    async execute(interaction){
        const user = interaction.options.getUser("user")
        
        const gifs = 
        [
        'https://nekos.best/api/v2/hug/4e721d9c-420c-4487-a65c-53a9d979cfbb.gif',
        'https://nekos.best/api/v2/hug/40142a6f-83c4-450e-a477-ca7c89787623.gif',
        'https://nekos.best/api/v2/hug/be9cad94-ad16-47be-ad78-7c8e278d2917.gif',
        'https://nekos.best/api/v2/hug/bfe6226c-f254-4c9c-ae10-a587233e381b.gif',
        'https://nekos.best/api/v2/hug/e93c3408-fa92-43ea-a6ff-106a5d88de85.gif',
        'https://nekos.best/api/v2/hug/128079f7-88dd-42c7-a2a4-e0bd2cdb5dce.gif',
        'https://nekos.best/api/v2/hug/4619bde0-9f22-4010-a58a-d6a4cb8d12a4.gif',
        'https://nekos.best/api/v2/hug/76d225e6-6494-4c23-a4f8-9117afc5edf9.gif',
        'https://nekos.best/api/v2/hug/f88c212e-b0dc-4a44-a6ef-8f9ab761d95d.gif',
        'https://nekos.best/api/v2/hug/b979d171-f9ab-4eda-a002-6da7371ddd6b.gif',
        'https://nekos.best/api/v2/hug/1e872929-e623-46ba-b5dc-fe05dfc61990.gif',
        'https://nekos.best/api/v2/hug/6ffba377-796c-4157-88a1-82e4b1198340.gif'
        ]

        const random = Math.floor(Math.random() * gifs.length);

        const hugEmbed = new EmbedBuilder()
        .setTitle('Hug!')
        .setDescription(`${interaction.member} just hugged ${user}!`)
        .setImage(gifs[random])
    
        interaction.reply({embeds: [hugEmbed]})
    }

   
};