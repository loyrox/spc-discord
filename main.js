const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./loaders/loadCommands")
const loadEvents = require("./loaders/loadEvents")
const config = require("./config")

bot.commands = new Discord.Collection();

bot.color = "#ffff"

bot.function = {
    createId: require("./Fonctions/creatId"),
    calculXp: require("./Fonctions/calculXp")
}


bot.on("ready", async () => {
    
    //console.log(`✅(${bot.user.username}) est désormait opérationel ✅`)
    console.log(
      `${"-".repeat(40)}\n` +
      "|  Logs.  |\n" +
      `${"-".repeat(40)}\n` +
      "Bot Infos : \n" +
      `Nom du bot    : ${bot.user.tag}!\n` +
      `ID du bot     : ${bot.user.id}\n` +
      `Invitation : https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=2146958847 \n` +
      `${"-".repeat(40)}\n`
    );
  
  })

bot.login(process.env.TOKEN)

loadCommands(bot)
loadEvents(bot)




