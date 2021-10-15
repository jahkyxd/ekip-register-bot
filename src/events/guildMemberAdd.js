const db = require("quick.db");
const config = require("../../config.json");
const moment = require("moment");
moment.locale("tr");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js")


module.exports = async member => {
    if (member.user.bot) return;
    db.add(`girişçıkış.${member.id}`, 1);
    if (db.get(`girişçıkış.${member.id}`) >= 3) {//3 defa çık gir yaparsa
        member.guild.members.ban(member.id, { reason: `Sunucudan kısa sürede çok fazla gir çık yapmak.` })
        client.channels.cache.get(config.channels.welcomechannel).send(`${member} adlı kullanıcı sunucuya kısa süre içinde defalarca çık gir yaptığı için sunucudan banlandı!`)
        member.send("Sunucuya kısa süre içinde defalarca çık gir yaptığın için sunucudan banlandın!")
    }
    var kurulus = (Date.now() - member.user.createdTimestamp);
    var zaman = moment.duration(kurulus).format("Y [Yıl], M [Ay]");
    var zaman2 = moment.duration(kurulus).format("DD [Gün], HH [saat], mm [dakika], ss [saniye]");
    const date = moment(member.user.createdAt)
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);
    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;
    var string = "";
    if (years > 0) string += `${years} yıl ${months} ay`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks + " hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days + " gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours + " saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins + " dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs + " saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
    string = string.trim();
    const endAt = member.user.createdAt
    const gün = moment(new Date(endAt).toISOString()).format('DD')
    const ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
    const yıl = moment(new Date(endAt).toISOString()).format('YYYY')
    const saat = moment(new Date(endAt).toISOString()).format('HH:mm')
    const kuruluş = `${gün} ${ay} ${yıl} ${saat}`;
    if (kurulus > 604800000) {
        member.setNickname(config.registration.autonickname);
        member.roles.add(config.registration.unregistered);
        client.channels.cache.get(config.channels.welcomechannel).send(`**:tada: ${config.Guild.GuilDName}'e** hoş geldin, ${member}!
      
      Hesabın **${kuruluş}** tarihinde **${zaman}** önce  açılmış
  
      Sunucu kurallarımız <#${config.channels.rules}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki **ceza işlemlerin kuralları okuduğunu varsayarak** gerçekleştirilecek.
  
      Seninle beraber **${member.guild.memberCount}** kişi olduk! Sol tarafta bulunan **Confirmation** odalarından birine girerek kayıt işlemini gerçekleştirebilirsin.`);
    } else {
        member.setNickname(config.registration.susoeciosnickname);
        member.roles.add(config.registration.suspecios);
        client.channels.cache.get(config.channels.welcomechannel).send(
            new MessageEmbed()
                .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
                .setColor("RED")
                .setDescription(`${member}, Adlı Kullanıcı Sunucuya Katıldı Hesabı **${zaman2}** Önce Açıldığı İçin Şüpheli!`)
                .setTimestamp());
    }
}

module.exports.conf = {
    name: "guildMemberAdd"
}