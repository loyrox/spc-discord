const Discord = require("discord.js")
const ms = require("ms")
const config = require("../config")

module.exports = {
    name: "unmute",
    description: "unmute un membre",
    dm: false,
    category: ":police_car: Modération",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à unmute",
            autocomplete: false,
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raisn du unmute",
            autocomplete: false,
            required: true
        }
    ],

    async run(bot, message, args) {
        
        let user = args.getUser("membre")
        if(!user) return message.reply("Aucun membre trouvés")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Aucun membre trouvés")

        let raison = args.getString("raison")
        if(!raison) raison = "Aucune raison fournie."

        if(!member.moderatable) return message.reply("Je ne peut pas unmute ce membre")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peut pas unmute plus haut que toi") 
        if(!member.isCommunicationDisabled()) return message.reply("Ce membre n'est pas mute !")

        try{

            await user.send(`Vous avez était unmute par ${message.user.tag} pour la raison suivante: **${raison}** `)
            await message.reply(`${message.user.tag} a unmute ${user.tag} pour la raison suivante: **${raison}** `)

            await member.timeout(null, raison)
        }catch(err){

        }
    }
}