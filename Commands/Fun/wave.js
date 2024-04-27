const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wave") // Name Of Slash Command
    .setDescription("Wave to someone!")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user you want to say hello.").setRequired(true)
    ),

    async execute(interaction){
        const user = interaction.options.getUser("user")
        
        const gifs = 
        [
        'https://nekos.best/api/v2/wave/0f98ba3e-5158-40b7-8aec-c465dd7c7c0e.gif',
        'https://nekos.best/api/v2/wave/2905ad88-4be2-4fb4-b8f7-d8bc8cd9b8a9.gif',
        'https://nekos.best/api/v2/wave/b1090630-213d-4917-8569-c2a35e68a674.gif',
        'https://nekos.best/api/v2/wave/b54057b5-6700-4972-9aed-4d2931bd86dd.gif',
        'https://nekos.best/api/v2/wave/800d9945-fdd0-47c8-9fe8-6b51ceaffac8.gif',
        'https://nekos.best/api/v2/wave/bdb35534-0065-4032-ab98-40bd49ff0694.gif',
        'https://nekos.best/api/v2/wave/91007469-1595-499e-a7c5-3fe2a56e8a2d.gif',
        'https://nekos.best/api/v2/wave/f3037a85-bc97-42bf-90af-e88913802b24.gif',
        'https://nekos.best/api/v2/wave/2415a9ac-ef8e-4ff9-9ac0-5d13753ad740.gif',
        'https://nekos.best/api/v2/wave/bbcbc092-c770-4459-9ea7-95bc577e2b79.gif',
        'https://nekos.best/api/v2/wave/be7a1443-268e-4c38-bb3e-5687f6aed72d.gif',
        'https://nekos.best/api/v2/wave/617f0aef-23cd-4ffe-b629-437843e17ff1.gif'
        ]

        const random = Math.floor(Math.random() * gifs.length);

        const waveEmbed = new EmbedBuilder()
        .setTitle('Wave!')
        .setDescription(`${interaction.member} just waved ${user}!`)
        .setImage(gifs[random])
    
        interaction.reply({embeds: [waveEmbed]})
    }

   
};