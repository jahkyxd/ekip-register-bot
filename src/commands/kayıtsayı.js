const db = require("quick.db");
module.exports = {
    name: "kayıtsayı",
    aliases: ["teyitler", "kayıtsayım"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]) || author;
        let erkek = db.get(`erkek_${member.id}`) || 0;
        let kadın = db.get(`kadın_${member.id}`) || 0;
        let toplam = db.get(`toplam_${member.id}`) || 0;
        channel.send(embed.setDescription(`${member} kullanıcısının toplam: **${toplam}**, toplam erkek: **${erkek}**, toplam kadın: **${kadın}** kaydı bulunmakta`));
    }
}