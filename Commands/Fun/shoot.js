const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shoot") // Name Of Slash Command
    .setDescription("Shoot to someone!")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user you want to shoot.").setRequired(true)
    ),

    async execute(interaction){
        const user = interaction.options.getUser("user")
        
        const gifs = 
        [
        'https://nekos.best/api/v2/shoot/77daac09-d578-459d-939e-eb7f4465a16e.gif',
        'https://nekos.best/api/v2/shoot/1e43afcb-5fe5-466a-8028-3dc7be29e0e0.gif',
        'https://nekos.best/api/v2/shoot/767524d1-7d9d-48b8-b571-d08d7753f64e.gif',
        'https://nekos.best/api/v2/shoot/4729a845-d48c-4420-a46f-3afa0b5d6a49.gif',
        'https://nekos.best/api/v2/shoot/7c146ee7-c949-434d-990d-07fda3e3f5fc.gif',
        'https://nekos.best/api/v2/shoot/1d0aae22-1f1a-436b-a5f8-c2f2cf024547.gif',
        'https://nekos.best/api/v2/shoot/3ee6ef15-831d-4073-b60b-7b7f04b80dd2.gif',
        'https://nekos.best/api/v2/shoot/a44f2a4a-bde1-414a-951f-fb4fb0e2a2cc.gif',
        'https://nekos.best/api/v2/shoot/b92f5583-1295-4a80-be97-c857947112b5.gif',
        'https://nekos.best/api/v2/shoot/7763a62f-5d4a-4693-a06a-01473433719c.gif',
        'https://nekos.best/api/v2/shoot/82af1bc8-23cd-409d-a6e4-1526790c0408.gif',
        'https://nekos.best/api/v2/shoot/019a96f7-b841-494c-8648-b18bc21a9c13.gif'
        ]

        const random = Math.floor(Math.random() * gifs.length);

        const shootEmbed = new EmbedBuilder()
        .setTitle('Shoot!')
        .setDescription(`${interaction.member} just shot ${user}!`)
        .setImage(gifs[random])
    
        interaction.reply({embeds: [shootEmbed]})
    }

   
};