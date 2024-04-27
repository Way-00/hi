const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addrole") // Name Of Slash Command
    .setDescription("Adds a role to a User.") // Description Of Slash Command
    // Selecting User To Add Role
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The User you want to add the role.")
        .setRequired(true)
    )
    // Selecting Role To Add To User
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role you want to add to the User.")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles) // Permission To Use Command
    .setDMPermission(false),
  async execute(interaction, client) {
    const user = interaction.options.getMember("member"); // Get User From Options
    const role = interaction.options.getRole("role");
    
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageRoles
      )
    ) {
      return await interaction.reply({
        content: "You do not have the permissions to do that.",
        ephemeral: true,
      });
    }// Get Role From Options

    if (user.roles.cache.has(role.id)) {
      // If User Already Has Role
      await interaction.reply({
        content: `${user} already has ${role}`,
        ephemeral: true,
      });
    } else {
      // If User Doesn't Have Role
      const embed = new EmbedBuilder()
        .setTitle("Add Role")
        .setDescription(
          `You want to add ${role} to ${user}?\n\nSelect using the buttons below.`
        )
        .setColor("Random");

      const buttons = new ActionRowBuilder().addComponents(
        // Yes And No Buttons
        new ButtonBuilder()
          .setLabel("Yes")
          .setCustomId("yes")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setLabel("No")
          .setCustomId("no")
          .setStyle(ButtonStyle.Danger)
      );

      const msg = await interaction.reply({
        embeds: [embed],
        components: [buttons],
        fetchReply: true,
      });

      // Button Collector
      const collector = msg.createMessageComponentCollector({
        filter: (i) => i.user.id === interaction.user.id,
        time: 40000, // Time WithIn You Have To React To Buttons // 40 Seconds
      });

      collector.on("collect", async (i) => {
        const id = i.customId;
        const value = id;

        if (value === "yes") {
          // If Yes Button Is Selected
          await interaction.followUp({
            content: `Successfully added **${role.name}** to ${user}`,
          });
          user.roles.add(role);
          await i.update({
            content: `Interaction Completed`,
            embeds: [embed],
            components: [],
          });
          collector.stop();
        } else if (value === "no") {
          // If No Button Is Selected
          await interaction.followUp({ content: `Cancelled`, ephemeral: true });
          await i.update({
            content: `Interaction Completed`,
            embeds: [embed],
            components: [],
          });
          collector.stop();
        }
      });

      collector.on("end", async (collected) => {
        // If Buttons Are Not Reacted In Time
        await interaction.editReply({
          content: `Buttons were not used in time`,
          embeds: [embed],
          components: [],
        });
        collector.stop();
      });
    }
  },
};
