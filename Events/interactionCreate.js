
const Discord = require("discord.js")

module.exports = async (bot, interaction) => {

    if(interaction.isButton()) {
        if(interaction.customId.startsWith("verify_")){
            const role = interaction.guild.roles.cache.get(interaction.customId.split("verify_")[1])
            if(!interaction.member.roles.cache.has(role.id)){
                interaction.member.roles.add(role.id).then(() => {
                    interaction.reply({content: `Vous avez reçu le rôle <@&${role.id}>`, ephemeral: true})
                })
            }else if(interaction.member.roles.cache.has(role.id)){
                interaction.reply({content: "Tes déjà verif mon reuf", ephemeral: true})
            }
        }
    }

    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused()

        if(interaction.commandName === "help"){

            let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choice => ({name: choice.name, value: choice.name})))
        }
    }

    if(interaction.type === Discord.InteractionType.ApplicationCommand) {

        let command = require(`../Commandes/${interaction.commandName}`)
        command.run(bot, interaction, interaction.options, bot.db)
    }

    
}
