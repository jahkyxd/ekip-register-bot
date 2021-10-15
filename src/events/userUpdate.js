const config = require("../../config.json");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = async function (oldUser, newUser) {
    const guild = client.guilds.cache.get(config.Guild.GuildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === config.roles.team)
    const member = guild.members.cache.get(newUser.id)
    const embed = new MessageEmbed().setTimestamp().setFooter(`Jahky ❤️ ${config.Guild.GuilDName}`)
    if (newUser.username !== oldUser.username) {
        if (newUser.discriminator === config.registration.GuildDiscrim) return
        if (oldUser.username.includes(config.registration.GuilDTag) && !newUser.username.includes(config.registration.GuilDTag)) {
            member.roles.remove(config.roles.team)
            client.channels.cache.get(config.logs.taglog).send(embed.setDescription(` ${newUser} isminden \`${config.registration.GuilDTag}\` çıkartarak ailemizden ayrıldı!`))
        } else if (!oldUser.username.includes(config.registration.GuilDTag) && newUser.username.includes(config.registration.GuilDTag)) {
            member.roles.add(config.roles.team)
            client.channels.cache.get(config.channels.chat).send(` Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.`)
            client.channels.cache.get(config.logs.taglog).send(embed.setDescription(` ${newUser} ismine \`${config.registration.GuilDTag}\` alarak ailemize katıldı`))
        }
    }
    if (newUser.discriminator !== oldUser.discriminator) {
        if (newUser.username.includes(config.registration.GuilDTag)) return
        if (oldUser.discriminator == config.registration.GuildDiscrim && newUser.discriminator !== config.registration.GuildDiscrim) {
            member.roles.remove(config.roles.team)
            client.channels.cache.get(config.logs.taglog).send(embed.setDescription(`${newUser} etiketinden \`${config.registration.GuildDiscrim}\` çıkartarak ailemizden ayrıldı!`))
        } else if (oldUser.discriminator !== config.registration.GuildDiscrim && newUser.discriminator == config.registration.GuildDiscrim) {
            member.roles.add(config.roles.team)
            client.channels.cache.get(config.logs.taglog).send(embed.setDescription(`${newUser} etiketine \config.registration.GuildDiscrim\` alarak ailemize katıldı`))
            client.channels.cache.get(config.channels.chat).send(` Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.`)
        }
    }
}

module.exports.conf = {
    name: "userUpdate"
}