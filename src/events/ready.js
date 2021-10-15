const config = require("../../config.json");
const db = require("quick.db");
const client = global.client;

module.exports = () => {
    client.user.setPresence({ activity: { name: `Jahky. ❤️ ${config.Guild.GuilDName}`, type: "LISTENING" }, status: "dnd" });
    if (config.channels.voicechannel) client.channels.cache.get(config.channels.voicechannel).join();
    setInterval(function () {
        db.all().filter(data => data.ID.endsWith("girişçıkış")).forEach(data => {
            db.delete(data.ID)
        })
    }, 1000 * 60 * 60 * 5)
}

module.exports.conf = {
    name: "ready"
}