const Discord = require("discord.js")
const Canvas = require("discord-canvas-easy")

module.exports = {
    name: "rank",
    description: "Donne le rank d'un membre",
    permission: "Aucune",
    dm: false,
    category: ":police_car: Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "L'Xp du membre à voir",
            required: false,
            autocomplete: false,
        }
    ],
    

    async run(bot, message, args, db) {
        
        let user;
        if(args.getUser("membre")) {
            user = args.getUser("membre")
            if(!user || !message.guild.members.cache.get(user?.id)) return message.reply("Pas de membre !")

        } else user = message.user;

        db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => {

            db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}'`, async (err, all) => {
                
            if(req.length < 1) return message.reply("Ce membre n'a pas d'xp")

            await message.deferReply()
                
                all = await all.sort(async (a, b) => (await bot.function.calculXp(parseInt(b.xp), parseInt(b.level))) - (await bot.function.calculXp(parseInt(a.xp), parseInt(a.level))))
                    
                let xp = parseInt(req[0].xp)
                let level = parseInt(req[0].level)

                let rank = all.findIndex(r => r.user === message.user.id) + 1
                let need = (level + 1) * 1000

                let Card = await new Canvas.Card()
                .setBackground("https://img.freepik.com/photos-gratuite/planches-bois-fond-brillant_1253-22.jpg?w=2000")
                .setBot(bot)
                .setColorFont("#fff")
                .setRank(rank)
                .setUser(user)
                .setColorProgressBar("#af59ff")
                .setGuild(message.guild)
                .setXp(xp)
                .setLevel(level)
                .setXpNeed(need)
                .toCard()

                await message.followUp({files: [new Discord.AttachmentBuilder(Card.toBuffer(), {name: "rank.png"})]})
            })
        })
    }
}