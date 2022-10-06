const {EmbedBuilder, PermissionsBitField} = require("discord.js");
 
module.exports = {
 
    name: 'help',
    description: "Voir les commandes disponibles",
    permission: "Aucune",
    category: ":grey_question: Information",
    dm: true,
    options: [
        {
            type: "string",
            name: "command",
            description: "Commande à afficher",
            autocomplete: true,
            required: false
        }
    ],
 
    async run(bot, message, args) {
 
        let command;
        if (args.getString("command")) {
 
            command = bot.commands.get(args.getString("command"));
            if (!command) return message.reply({
                content: `La commande \`${command}\` n'existe pas.`,
                ephemeral: true
            })
 
        }
 
        if (!command) {
 
            let categories = [];
            bot.commands.forEach(command => {
                if (!categories.includes(command.category)) categories.push(command.category);
            })
 
            let Embed = new EmbedBuilder()
                .setColor(bot.color)
                .setTitle("Commandes du bot")
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setDescription(`Commandes disponibles: \`${bot.commands.size}\`\nCatégories disponibles: \`${categories.length}\``)
                .setTimestamp()
                .setFooter({text:"Bot By Loyrox"});
 
            await categories.sort().forEach(async cat => {
                let commands = bot.commands.filter(cmd => cmd.category === cat);
                Embed.addFields({
                    name: `• ${cat}`,
                    value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`,
                    inline: false
                })
            });
 
            await message.reply({
                embeds: [Embed],
                ephemeral: true
            })
 
        } else {
 
            let Embed = new EmbedBuilder()
                .setColor(bot.color)
                .setTitle("Commandes du bot" + `: ${command.name}`)
                .setTimestamp()
                .setFooter({text: "Bot By Loyrox"})
                .setDescription(`Nom: \`${command.name}\`\nDescription: ${command.description}\nPermission: \`${typeof command.permissions !== "bigint" ? command.permissions : new PermissionsBitField(command.permissions).toArray(false)}\`\nCommande en DM: \`${command.dm ? "Oui" : "Non"}\`\nCatégorie: \`${command.category}\``);
 
            await message.reply({
                embeds: [Embed],
                ephemeral: true
            })
 
        }
 
    }
 
}