
const Discord = require("discord.js")
const loadDatabase = require("../Loaders/loadDatabase")
const loadSlashCommand = require("../Loaders/loadSlashCommands")
const mysql = require("mysql")
const { ActivityType } = require("discord.js")


module.exports = async bot => {

    await loadSlashCommand(bot)


    bot.db = await loadDatabase()
    bot.db.connect(function(err) {

        if(err) throw err;
    
        console.log("La base de données a été connectée avec succès !")
    })

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


        await bot.user.setActivity('Bot By Loyrox', { type: ActivityType.Streaming, url: "https://twitch.tv/sl_loyrox" });

    }