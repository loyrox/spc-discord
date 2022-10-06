const Discord = require("discord.js")
const config = require("../config")

module.exports = {

    name: "kick",
    description: "kick un membres du serveurs",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: ":police_car: Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à kick",
            autocomplete: false,
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du kick",
            autocomplete: false,
            required: false
        }
    ],

    async run(bot, message, args) {


            let user = args.getUser("membre")
            if(!user) return message.reply("Aucun membres trouvé")
            let member = message.guild.members.cache.get(user.id)
            if(!member){
                return message.reply("Aucun membres trouvé")
            }
                

            let raison = args.getString("raison")

            if(!raison) raison = "Pas de raison fournie"

             if(message.user.id === user.id) return message.reply("Essaie pas de t'e kick débile") 
            if(await message.guild.fetchOwner() === user.id) return message.reply("Pk t'essaye de kick le maitre ?")
            if(member && !member.kickable) return message.reply("Je ne peut pas kick ce membre")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peut pas kick plus haut que toi") 

            try {
                await user.send(`Tu as été kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison suivante: **${raison}*`)
                await message.reply(`${message.user} à kick ${user.tag} pour la raison suivante : **${raison}*`)

                await member.kick(raison)

            } catch(err) {
            }

    }
}