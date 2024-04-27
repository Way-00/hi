const { ActivityType } = require("discord.js");
const mongo = require("mongoose");
const {mongo_url} = require('../../../config.json')

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(
      `${client.user.username} Is Ready And Is Running In ${client.guilds.cache.size} Servers!`
    );

    const activities = [
      `Join discord+socials in bio for any info! ❤️`,
      `Vote me on top.gg 🚀 `,
      `Use me for moderation + fun! ❤️ `,
      `${client.user.username} Is Running In ${client.guilds.cache.size} Servers! 🚀`,
      `Find a bug? Have a problem with the bot? Join discord! ❤️`
    ];

    setInterval(() => {
      const status = activities[Math.floor(Math.random() * activities.length)];
      client.user.setPresence({
        activities: [{ name: `${status}`, type: ActivityType.Custom }],
        status: "dnd",
      });
    }, 7500);

    mongo.connect(mongo_url, {});

    mongo.connection.on("connected", () => {
      console.log("Succesfully connected To MongoDB");
    });
    mongo.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
    });
    mongo.connection.on("err", () => {
      console.log(`MongoDB Error:\n${err}`);
    });
  },
};
