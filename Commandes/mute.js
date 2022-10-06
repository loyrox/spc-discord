const Discord = require("discord.js")
const ms = require("ms")
const config = require("../config")

module.exports = {
    name: "mute",
    description: "Mute un membre",
    dm: false,
    category: ":police_car: Modération",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à mute",
            autocomplete: false,
            required: true
        }, {
            type: "string",
            name: "temp",
            description: "Le temp du mute (1d = 1jour, 1m, 1 minute, 1s = 1 seconde)",
            autocomplete: false,
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raisn du mute",
            autocomplete: false,
            required: true
        }
    ],

    async run(bot, message, args) {
        
        let user = args.getUser('membre')
        if(!user) return message.reply("Pas de membre !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Aucun membre trouvé")

        let time = args.getString("temp")
        if(!time) return message.reply("Aucun temps renseigner")
        if(isNaN(ms(time))) return message.reply("Pas le bon format !")

        if(ms(time) > 2419200000) return message.reply("mute ne peut pas durer plus de 28 jours !")

        let raison = args.getString("raison")
        if(!raison) raison = "Aucune raison fournie";

        if(message.user.id === user.id) return message.reply("Essaie pas de t'e mute débile") 
        if(await message.guild.fetchOwner() === user.id) return message.reply("Pk t'essaye de mute le maitre ?")
        if(!member.moderatable) return message.reply("Je ne peut pas mute ce membre")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peut pas mute plus haut que toi") 

        if(member.isCommunicationDisabled()) return message.reply("Ce membre est déjà mute !")

        try {

            
            await user.send(`Tu as été mute du serveur ${message.guild.name} par ${message.user.tag} pendant ${time}  pour la raison suivante: **${raison}**`)
            await message.reply(`${message.user} à mute ${user.tag} pendant ${time} pour la raison suivante : **${raison}**`)
            await member.timeout(ms(time), raison)
            

        } catch(err) {
        }
    }
}
