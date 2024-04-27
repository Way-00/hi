const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pat") // Name Of Slash Command
    .setDescription("Pat pat someone!")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user you want to pat.").setRequired(true)
    ),

    async execute(interaction){
        const user = interaction.options.getUser("user")
        
        const gifs = 
        [
        'https://nekos.best/api/v2/pat/3cc16489-0d91-41eb-87d7-e2ef26ae17d3.gif',
        'https://nekos.best/api/v2/pat/1923f180-2b55-406b-9f01-8c2e0873d1cc.gif',
        'https://nekos.best/api/v2/pat/5d1c0782-5cd4-4345-8946-3da9f0c059d5.gif',
        'https://nekos.best/api/v2/pat/8d2cc8a6-eff4-4c54-8cc1-e705a1c6e75d.gif',
        'https://nekos.best/api/v2/pat/b7c2a151-6356-4209-8cfd-a01b72dd1986.gif',
        'https://nekos.best/api/v2/pat/6151527a-91de-498b-8e09-53c7a76955b3.gif',
        'https://nekos.best/api/v2/pat/2c2a5692-84ab-4367-8ca9-668774ac2191.gif',
        'https://nekos.best/api/v2/pat/e574c4f5-9ebe-4647-994b-116db15eaee2.gif',
        'https://nekos.best/api/v2/pat/4d358d31-771b-4079-97f9-efb27e830100.gif',
        'https://nekos.best/api/v2/pat/ded6ce33-3122-40b1-b89d-1e3a4243cb59.gif',
        'https://nekos.best/api/v2/pat/c4ff0caa-30c4-4a78-b345-0f6241bcad41.gif',
        'https://nekos.best/api/v2/pat/03a90347-9529-44b3-8b1c-5cffd3b57906.gif'
        ]

        const random = Math.floor(Math.random() * gifs.length);

        const patEmbed = new EmbedBuilder()
        .setTitle('Pat!')
        .setDescription(`${interaction.member} just patted ${user}!`)
        .setImage(gifs[random])
    
        interaction.reply({embeds: [patEmbed]})
    }

   
};