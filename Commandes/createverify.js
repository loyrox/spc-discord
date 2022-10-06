const {
    EmbedBuilder, 
    ButtonStyle, 
    ActionRowBuilder, 
    ButtonBuilder, 
    PermissionFlagsBits
} = require('discord.js')
const config = require('../config')

module.exports = {

    name: "createverify",
    description: "Configuration du système de vérification",
    permission: PermissionFlagsBits.Administrator,
    category: "Administration",
    usage: "/createverify [channel] [role]",
    dm: false,
    options: [
        {
            type: "channel",
            name: "channel",
            description: "Le canal que vous voulez être le canal de vérification !",
            required: true,
            autocomplete: false,
        }, {
            type: 'role',
            name: "role",
            description: "Le rôle que vous souhaitez ajouter à l'utilisateur qui a vérifié !",
            required: true,
            autocomplete: false,
        },
    ],

    async run(bot, message, args, interaction) {

        let channel = args.getChannel('channel')
        if(!channel) return message.reply({content: ':x: | **Channel introuvable ou inexistante !**', ephemeral: true})
        let role = args.getRole('role')
        if(!role) return message.reply({content: `:x: | **Je ne trouve pas le rôle !**`, ephemeral: true})

        try{
            let VerifEmbed = new EmbedBuilder()
                .setTitle(':white_check_mark: | Vérifiez-vous !')
                .setDescription('Cliquez sur le bouton ci-dessous (✅) pour vous vérifier !')
                .setThumbnail(bot.user.displayAvatarURL())
                .setFooter({text: `${bot.user.username} | Système de vérification`, iconURL: bot.user.displayAvatarURL()})
                .setColor(config.color)

            let sendChannel = channel.send({
                embeds: [VerifEmbed],
                components: [new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`verify_${role.id}`)
                            .setEmoji('✅')
                            .setStyle(ButtonStyle.Success)
                            .setDisabled(false)
                )]
            })

            if(!sendChannel) return message.reply({content: ':x: | **Une erreur s\'est produite... Réessayez plus tard !**', ephemeral: true})
            else return message.reply({content: `Message de vérification envoyé avec succès ${channel}`, ephemeral: true})
        }catch(err) {
            message.reply({content: ":x: | **Je ne peux pas ajouter ce rôle !**", ephemeral: true})
        }
    }
}
