const client = global.client;
const { TextChannel, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");

module.exports = async client => {

    TextChannel.prototype.error = async function (message, text) {
        const owner = client.users.cache.get("618444525727383592");
        const embed = new MessageEmbed()
            .setColor(message.member.displayHexColor)
            .setAuthor(message.member.displayName, author.avatarURL({ dynamic: true, size: 2048 }))
            .setFooter("Developed By Jahky.", owner.avatarURL({ dynamic: true }))
        this.send(embed.setDescription(text)).then(x => { if (x.deletable) x.delete({ timeout: 10000 }) });
    }
};

/**
 * @param {number} Minimum
 * @param {number} Maximum
 * @returns {number}
 */
function randomnumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.random = randomnumber