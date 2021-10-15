const {Client, Collection} = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const { readdir, readdirSync } = require("fs");
const config = require("./config.json");
const db = require("quick.db");
const moment = require('moment');
require("moment-duration-format");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();

require("./src/helpers/function")(client);

readdirSync('./src/commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./src/commands/${files}`);
    commands.set(command.name, command);
    console.log(`[COMMAND] ${command.name} loaded!`);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

readdir("./src/events", (err, files) => {
    if (err) return console.error(err);
    files.filter((file) => file.endsWith(".js")).forEach((file) => {
        let prop = require(`./src/events/${file}`);
        if (!prop.conf) return;
        client.on(prop.conf.name, prop)
        console.log(`[EVENT] ${prop.conf.name} loaded!`);
    });
});

client.login(config.bot.token).then(x => console.log(`Bot ${client.user.username} olarak giriş yaptı`)).catch(err => console.log(`Bot Giriş yapamadı sebep: ${err}`));