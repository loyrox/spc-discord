const Discord = require("discord.js")

module.exports = {

    name: "warn",
    description: "Avertir un membre du serveur",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: ":police_car: Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à avertir",
            autocomplete: false,
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison de l'avertissement",
            autocomplete: false,
            required: false
        }
    ],

    async run(bot, message, args, db) {
        let user = args.getUser("membre")
        if(!user) return message.reply("Pas de membre trouvé")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Aucun membre trouvé")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie"

/*         if(message.user.id === user.id) return message.reply("Essaie pas de t'e warn débile") 
        if(await message.guild.fetchOwner() === user.id) return message.reply("Pk t'essaye de warn le maitre ?")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peut pas warn plus haut que toi") 
        if(await message.guild.members.fetchMe().roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Le robot ne peux pas warn ce membre") */

        try { await user.send(`${message.user.tag} vous a warn sur le serveur ${message.guild.name} pour la raison : **${reason}**`)
    
        await message.reply(`Vous avez warn ${user.tag} pour la raison suivante: **${reason}**`)

        let ID = await bot.function.createId("WARN")


       let sql = `INSERT INTO warns (guild, user, author, warn, reason, date) VALUES (${message.guild.id}, '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\ '")}', '${Date.now()}')`
    db.query(sql, function(err) {
        if(err) throw err;
    })
    } catch (err) {
            
        console.log("impossible")

        }
    }
}