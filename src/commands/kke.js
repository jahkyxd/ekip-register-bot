const db = require("quick.db");

module.exports = {
    name: 'kke',
    aliases: ["kayıt-yetkilisi"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0])
        if (!member) return channel.error(message, "Lütfen bir kullanıcıyı etiketle.")
        let kke = db.get(`kke_${member.id}`);
        if (!kke) return channel.error(message, "Bu kullanıcı kayıt olmamış")
        channel.send(embed.setTitle("Kullanıcı kayıt görevlisi").setDescription(`${kke.join("\n")}`))
    }
}