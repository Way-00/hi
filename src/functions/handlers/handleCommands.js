const { REST, Routes } = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const {token} = require('../../../config.json')

module.exports = (client) => {
  client.handleCommands = async () => {
    // Registring Commands
    const commandFolders = fs.readdirSync("./Commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./Commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../../Commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const clientID = "1229015501405945926"; 
    const rest = new REST({ version: "10" }).setToken(token);

    try {
      console.log(`Started refreshing commands`);

      await rest.put(Routes.applicationCommands(clientID), {
        body: client.commandArray,
      });

      console.log(`Successfully refreshed commands`);
    } catch (error) {
      console.error(error);
    }
  };
};
