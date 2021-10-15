const config = require("../../config.json")
const db = require("quick.db");

module.exports = {
    name: "isim",
    aliases: ["i", "nickname"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        var name = args[1]
        var age = args[2]
        if (message.member.roles.cache.get(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Ne yazık ki komutu kullanan kişide yetki yok"));
        if (!member) return channel.send(embed.setDescription("Lütfen bir kullanıcıyı etiketle."));
        if (!name) return channel.send(embed.setDescription("Lütfen kullanıcı için bir isim belirt."));
        if (!age) return channel.send(embed.setDescription("Lütfen kullanıcı için bir yaş belirt."));
        if (isNaN(age)) return channel.send(embed.setDescription("Lütfen belirttiğin yaş rakamlardan oluşsun"))
        db.push(`isimler_${member.id}`, ` \`${config.registration.GuilDTag} ${name} ${config.registration.symbol} ${age}\` (İsim Değiştirme)`);
        await guild.members.cache.get(member.id).setNickname(`${config.registration.GuilDTag} ${name} ${config.registration.symbol} ${age}`);
        channel.send(embed.setDescription(`${member} Adlı kullanıcının ismi \`${config.registration.GuilDTag} ${name} ${config.registration.symbol} ${age}\` olarak değiştirildi`));
    }
}