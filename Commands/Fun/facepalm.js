const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("facepalm") // Name Of Slash Command
    .setDescription("Embarased,annoyed or disapointed? Facepalm!"),

    async execute(interaction){
        
        const gifs = 
        [
        'https://nekos.best/api/v2/facepalm/5f8a0f07-6310-4e87-9886-eda355938a41.gif',
        'https://nekos.best/api/v2/facepalm/233f9c4d-01d0-44ed-bee9-cd2e1f5651d2.gif',
        'https://nekos.best/api/v2/facepalm/1cc58512-dbba-4644-8502-74cd7ded555c.gif',
        'https://nekos.best/api/v2/facepalm/2d27d74d-6ac2-4c7c-b32f-aa74dd0f91ac.gif',
        'https://nekos.best/api/v2/facepalm/07ab0505-efd1-4e35-ade1-c66fea5bcc97.gif',
        'https://nekos.best/api/v2/facepalm/08919261-df4f-4180-9889-deccdee8b1fc.gif',
        'https://nekos.best/api/v2/facepalm/eceb5150-fe40-4f31-9de9-ebe5ab0017f4.gif',
        'https://nekos.best/api/v2/facepalm/4e493e2a-95d6-4f7d-88a4-a890d883381b.gif',
        'https://nekos.best/api/v2/facepalm/98010b68-ccdd-46f1-bcd7-3ae0e2d3d19c.gif',
        'https://nekos.best/api/v2/facepalm/4297d75c-2f0b-4c0f-ae1a-670e7b23e9d1.gif',
        ]

        const random = Math.floor(Math.random() * gifs.length);

        const facepalmEmbed = new EmbedBuilder()
        .setTitle('Think!')
        .setDescription(`${interaction.member} face palmed!`)
        .setImage(gifs[random])
    
        interaction.reply({embeds: [facepalmEmbed]})
    }

   
};