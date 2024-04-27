const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sleep") // Name Of Slash Command
    .setDescription("Fall asleep!"),

    async execute(interaction){
        const gifs = 
        [
        'https://nekos.best/api/v2/sleep/611a318f-1645-48f4-9cc0-099eb8d817d9.gif',
        'https://nekos.best/api/v2/sleep/f18b035c-d15d-4c10-ac06-3aa2bac786de.gif',
        'https://nekos.best/api/v2/sleep/0a0a346e-f75d-44c8-9e08-7f145a0e9db2.gif',
        'https://nekos.best/api/v2/sleep/96dc1e0d-2063-486f-9402-e7bcb7675533.gif',
        'https://nekos.best/api/v2/sleep/1fdb115c-4b62-4fdd-bdff-73ea9b0cf1fd.gif',
        'https://nekos.best/api/v2/sleep/cb44769a-f509-48af-8b9f-f6bed934768e.gif',
        'https://nekos.best/api/v2/sleep/668ec2d9-e551-4bce-b70d-0e53d9126cea.gif',
        'https://nekos.best/api/v2/sleep/0019bda6-a99a-42eb-8256-1ac130c3ccc0.gif',
        'https://nekos.best/api/v2/sleep/da3550a4-aa63-49f6-b642-281622e9f568.gif',
        'https://nekos.best/api/v2/sleep/1d2b6a70-fb29-4b6d-9198-3e3c1e83b0f1.gif',
        'https://nekos.best/api/v2/sleep/7e13d710-e5e7-4e9c-b72c-da23a38c14b6.gif'
        ]

        const random = Math.floor(Math.random() * gifs.length);

        const sleepEmbed = new EmbedBuilder()
        .setTitle('Slap!')
        .setDescription(`${interaction.member} fell asleep, shh~!`)
        .setImage(gifs[random])
    
        interaction.reply({embeds: [sleepEmbed]})
    }

   
};