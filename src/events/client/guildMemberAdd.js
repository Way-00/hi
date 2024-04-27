const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const Canvas = require("canvas");
const welcomeSchema = require("../../../models/welcome");

module.exports = {
  name: "guildMemberAdd",

  async execute(member, client) {
    const data = await welcomeSchema.findOne({
      Guild: member.guild.id,
    });
    if (!data) return;

    const canvas = Canvas.createCanvas(1770, 635);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(
      "https://i.imgur.com/MddWeh4.png"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#FFFFFF";

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    const name = `${member.user.username}`;
    if (name.length >= 16) {
      ctx.font = "bold 90px Sans";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 10;
      ctx.strokeText(name, 680, canvas.height / 2 + 34);
      ctx.fillStyle = "black";
      ctx.fillText(name, 680, canvas.height / 2 + 34);
    } else {
      ctx.font = "bold 130px Sans";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 10;
      ctx.strokeText(name, 680, canvas.height / 2 + 34);
      ctx.fillStyle = "black";
      ctx.fillText(name, 680, canvas.height / 2 + 34);
    }

    const server = `Welcome to ${member.guild.name}`;
    ctx.font = "bold 80px Sans";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;
    ctx.strokeText(server, 670, canvas.height / 2 - 115);
    ctx.fillStyle = "black";
    ctx.fillText(server, 670, canvas.height / 2 - 115);

    const member_count = `Member #${member.guild.memberCount}`;
    ctx.font = "bold 86px Sans";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;
    ctx.strokeText(member_count, 680, canvas.height / 2 + 165);
    ctx.fillStyle = "black";
    ctx.fillText(member_count, 680, canvas.height / 2 + 165);

    ctx.beginPath();
    ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ extension: "jpg" })
    );
    ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);

    const attachment = new AttachmentBuilder(await canvas.toBuffer(), {
      name: "welcome.png",
    });

    const channel = member.guild.channels.cache.get(data.Channel);
    if (!channel) return;
    let message = data.Message;
    if (!message || message === null)
      message = `Yo <@${member.id}>! Welcome to ${member.guild.name}`;
    else message = message.replace(/%MENTION%/g, `<@${member.id}>`);
    let rule = data.Rule;
    if (!rule || rule === null) rule = `NotActive`;
    else message += ` Make sure to check <#${rule}>`;
    const welcomeEmbed = new EmbedBuilder()
      .setColor("Random")
      .setTimestamp()
      .setAuthor({
        name: `<@${member.id}>, Welcome To ${member.guild.name}!`,
        iconURL: member.guild.iconURL(),
      })
      .setImage("attachment://welcome.png")
      .setDescription(`${message}`);
    await channel.send({
      embeds: [welcomeEmbed],
      files: [attachment],
    });

    let role = data.Role;
    if (!role || role === null) return;
    await member.roles.add(role);
  },
};
