const Discord = require("discord.js")

module.exports = {
    name: "say",
    description: "Envoyer une message à quelqu'un",
    dm: false,
    category: ":police_car: Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à mp",
            autocomplete: false,
            required: true
        }, {
            type: "string",
            name: "texte",
            description: "Le texte que tu veux envoyer",
            autocomplete: false,
            required: true
        }
    ],

    async run(bot, message, args) {
        let user = args.getUser("membre")
        if(!user) return message.reply("Aucun membre trouvés")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Aucun membre trouvés")

        let text = args.getString("texte")
        if(!text) return message.reply("Aucun texte à était ajouté")


        try{

            await user.send(`${text}`)

        }catch(err){

        }
    }
}