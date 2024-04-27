const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kiss") // Name Of Slash Command
    .setDescription("Give a kiss to someone!")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user you want to kiss.").setRequired(true)
    ),

    async execute(interaction){
        const user = interaction.options.getUser("user")
        
        const gifs = 
        [
        'https://nekos.best/api/v2/kiss/3eb02569-bc4d-4fcf-95c9-2d14cefd05ab.gif',
        'https://nekos.best/api/v2/kiss/5da175af-5d35-4a92-8d68-4bdc72695de9.gif',
        'https://nekos.best/api/v2/kiss/8f3d4d72-6d61-4071-9f23-6feeef219045.gif',
        'https://nekos.best/api/v2/kiss/fee74a4b-4ca4-461d-b279-685291430258.gif',
        'https://nekos.best/api/v2/kiss/5a0e8e01-8992-4b7a-91ed-2bbf3ac7e5b9.gif',
        'https://nekos.best/api/v2/kiss/eb798cf3-6d89-4c01-913b-bc2bc0014797.gif',
        'https://nekos.best/api/v2/kiss/3385ca97-b64b-4798-a4c4-292a7eb5a15e.gif',
        'https://nekos.best/api/v2/kiss/ff5b70d7-f3c5-4c90-b10c-69c2ea1d90c5.gif',
        'https://nekos.best/api/v2/kiss/fcc26655-b606-477f-948a-7fae5435a4e1.gif',
        'https://nekos.best/api/v2/kiss/739e8b8b-34a5-4190-ae78-74e1af15b905.gif',
        'https://nekos.best/api/v2/kiss/17c77bfb-7b16-4bd9-b5de-e00bd8bc229a.gif',
        'https://nekos.best/api/v2/kiss/b0a0d6f8-129a-46b7-9824-4b9a35723f17.gif'
        ]

        const random = Math.floor(Math.random() * gifs.length);

        const kissEmbed = new EmbedBuilder()
        .setTitle('Kiss!')
        .setDescription(`${interaction.member} just kissed ${user}!`)
        .setImage(gifs[random])
    
        interaction.reply({embeds: [kissEmbed]})
    }

   
};

