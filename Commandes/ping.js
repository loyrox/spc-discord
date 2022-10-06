const Discord = require("discord.js")

module.exports = {
    name: "ping",
    description: "Connaitre le ping du bot et de l'api discord",
    dm: true,
    category: ":grey_question: Information",
    

    async run(bot, message) {
        await message.reply(`Ping: \`${bot.ws.ping}\``)
    }
}