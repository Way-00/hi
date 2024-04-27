const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slap") // Name Of Slash Command
    .setDescription("Slap someone!")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user you want to slap.").setRequired(true)
    ),

    async execute(interaction){
        const user = interaction.options.getUser("user")
        
        const gifs = 
        [
        'https://nekos.best/api/v2/slap/4ff69414-f382-461b-a706-bdf2a569eef9.gif',
        'https://nekos.best/api/v2/slap/848ba536-c446-4c16-a340-cbc9903982de.gif',
        'https://nekos.best/api/v2/slap/abe266e2-ebf5-4226-a597-cf68cdcda564.gif',
        'https://nekos.best/api/v2/slap/2ae21a07-8dc9-4744-a3b6-007c39e70f95.gif',
        'https://nekos.best/api/v2/slap/1eee3d71-22f0-46bc-955d-051531235649.gif',
        'https://nekos.best/api/v2/slap/4d33d45c-edf8-4dac-9796-7b185e3b9045.gif',
        'https://nekos.best/api/v2/slap/ba438394-0f02-4d41-8caf-8fcd560888b8.gif',
        'https://nekos.best/api/v2/slap/2cba47d6-f9c3-482a-9cb8-bfa3cc19d95c.gif',
        'https://nekos.best/api/v2/slap/4d0cca54-0382-4435-b8c7-15d0394b520d.gif',
        'https://nekos.best/api/v2/slap/f3a20eba-d75b-4a59-8320-4bd05b13b720.gif',
        'https://nekos.best/api/v2/slap/2df935e0-32bb-478f-944f-dee423532816.gif',
        'https://nekos.best/api/v2/slap/7b7a7b27-6d9f-47c6-be8a-c196c1f50016.gif'
        ]

        const random = Math.floor(Math.random() * gifs.length);

        const slapEmbed = new EmbedBuilder()
        .setTitle('Slap!')
        .setDescription(`${interaction.member} just slapped ${user}!`)
        .setImage(gifs[random])
    
        interaction.reply({embeds: [slapEmbed]})
    }

   
};