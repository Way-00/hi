const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("think") // Name Of Slash Command
    .setDescription("Think..."),

    async execute(interaction){
        
        const gifs = 
        [
        'https://nekos.best/api/v2/think/7b10260d-404d-4efa-9d2c-914c4ed96910.gif',
        'https://nekos.best/api/v2/think/04593acb-08ab-43f7-a766-2991e840cff7.gif',
        'https://nekos.best/api/v2/think/ba3444e9-2712-436f-8336-1a81dad79ac7.gif',
        'https://nekos.best/api/v2/think/47706f73-5e88-475a-9074-9e15334ce9c3.gif',
        'https://nekos.best/api/v2/think/16aa975a-51f5-48c6-b3fa-989becca37fa.gif',
        'https://nekos.best/api/v2/think/e5496ae3-439f-428d-809c-216e2650ae8a.gif',
        'https://nekos.best/api/v2/think/fdb0537b-2855-4daf-872d-bdcca6d7d559.gif',
        'https://nekos.best/api/v2/think/594a9b78-d8fa-49f6-8839-d10dab2480b8.gif',
        'https://nekos.best/api/v2/think/5b8f0522-61b9-45f2-8477-940c44426b03.gif',
        'https://nekos.best/api/v2/think/b9483a01-2056-4c9a-98c5-f8baec620953.gif',
        'https://nekos.best/api/v2/think/fe1a0bda-c994-4128-998e-031cce1fde04.gif',
        'https://nekos.best/api/v2/think/5b814980-b063-48bd-9fdd-17baa3154052.gif'
        ]

        const random = Math.floor(Math.random() * gifs.length);

        const thinkEmbed = new EmbedBuilder()
        .setTitle('Think!')
        .setDescription(`${interaction.member} is thinking...`)
        .setImage(gifs[random])
    
        interaction.reply({embeds: [thinkEmbed]})
    }

   
};