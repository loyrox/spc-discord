const Discord = require("discord.js")
const config = require("../config")

module.exports = {

    name: "unban",
    description: "Unban un membres du serveurs",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: ":police_car: Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à débannir",
            autocomplete: false,
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du déban",
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

          
            if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre n'est pas ban")

            try {
                await user.send(`Tu as été unbanni du serveur ${message.guild.name} par ${message.user.tag} pour la raison suivante: **${raison}** | Le lien pour le rejoindre: discord.gg/7zwMtWPx5v`)
                await message.reply(`${message.user} a été unbanni ${user.tag} pour la raison suivante : **${raison}**`)

                await message.guild.members.unban(user, raison)

            } catch(err) {
            }


        } catch (err) {
            return message.reply("Aucun membres trouvé")
        }
    }
}