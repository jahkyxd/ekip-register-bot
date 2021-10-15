const db = require("quick.db");

module.exports = {
    name: 'isimler',
    aliases: ["names", "nicknames"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0])
        if (!member) return channel.error(message, "Lütfen bir kullanıcıyı etiketle.")
        let names = db.get(`isimler_${member.id}`);
        if (!names) return channel.error(message, "Bu kullanıcının geçmiş isimleri bulunmuyor")
        channel.send(embed.setTitle("Kullanıcı isimleri").setDescription(names.map((data, n) => `**${n + 1}.** ${data}`).join("\n")))
    }
}