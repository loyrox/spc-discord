const Discord = require("discord.js")
const config = require("../config")

module.exports = {

    name: "ban",
    description: "Ban un membres du serveurs",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: ":police_car: Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à bannir",
            autocomplete: false,
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du ban",
            autocomplete: false,
            required: false
        }
    ],

    async run(bot, message, args) {
        try {

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Aucun membres trouvé")
            let member = message.guild.members.cache.get(user.id)

            let raison = args.get("raison").value

            if(!raison) raison = "Pas de raison fournie"

             if(message.user.id === user.id) return message.reply("Essaie pas de t'e ban débile") 
            if(await message.guild.fetchOwner() === user.id) return message.reply("Pk t'essaye de ban le maitre ?")
            if(member && !member.bannable) return message.reply("Je ne peut pas ban ce membre")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peut pas bannir plus haut que toi") 
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déjà banni !")

            try {
                await user.send(`Tu as été banni du serveur ${message.guild.name} par ${message.user.tag} pour la raison suivante: **${raison}**`)
                await message.reply(`${message.user} a banni ${user.tag} pour la raison suivante : **${raison}**`)

                await message.guild.bans.create(user.id, {reason: raison})

            } catch(err) {
            }


        } catch (err) {
            return message.reply("Aucun membres trouvé")
        }
    }
}

