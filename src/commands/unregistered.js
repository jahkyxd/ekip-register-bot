const db = require("quick.db");
const config = require("../../config.json");

module.exports = {
    name: 'kayıtsız',
    aliases: ["unregistered", "kayitsiz", "unreg", "unregister", "ks"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        const member = message.mentions.members.first() ||guild.members.cache.get(args[0]);
        if (message.member.roles.cache.get(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Ne yazık ki komutu kullanan kişide yetki yok"));
        if (!member) return channel.send(embed.setDescription("Lütfen bir kullanıcıyı etiketle."));
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return channel.send(embed.setDescription("Belirttiğin kullanıcı seninle aynı yetkide veya senden üstün!"))
        }
        if (member.roles.cache.has(config.roles.booster) || member.roles.cache.has(config.roles.vip)) return channel.send(embed.setDescription("Booster ve vip kullanıcıları kayıtsıza atamazsın"));
        await guild.members.cache.get(member.id).roles.set(config.registration.unregistered);
        channel.send(embed.setDescription("Kullanıcı kayıtsıza atıldı"))
    }
}