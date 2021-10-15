const client = global.client;
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = async (message) => {
    if (!message.guild || message.author.bot) return
    if ([".tag", "!tag", "tag", "TAG"].some(x => message.content === x)) {
        message.channel.send(`\`${config.registration.GuilDTag}\`&\`${config.registration.GuildDiscrim}\``);
    };
    if (!message.content.startsWith(config.bot.prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    const owner = client.users.cache.get("618444525727383592");
    const author = message.author
    const channel = message.channel
    const guild = message.guild
    const embed = new MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setAuthor(message.member.displayName, author.avatarURL({ dynamic: true, size: 2048 }))
        .setFooter("Developed By Jahky.", owner.avatarURL({ dynamic: true }))
    if (cmd) {
        if (cmd.owner && config.bot.owner.includes[author.id]) return
        if (cmd.guildowner && config.bot.owner.includes[author.id] && guild.owner.id !== author.id) return
        cmd.execute(client, message, args, embed, author, channel, guild);
    }
}

module.exports.conf = {
    name: "message"
}