module.exports = {
    name: "eval",
    aliases: [],
    owner: true,
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!args[0]) return channel.send(embed.setDescription("Kod Belirt!"))
        let code = args.join(" ");
        function clean(text) {
            if (typeof text !== "string")
                text = require("util").inspect(text, { depth: 0 });
            text = text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
            return text;
        }
        try {
            var result = clean(await eval(code));
            if (result.includes(client.token))
                return channel.send("tokenim karşm: ``Njk2MTY4Nz8SDIFDU4OTA1MDk4.b4nug3rc3k.bir.t0k3ns4n4cak.kadarsalagim``");
            channel.send(result, { code: "js", split: true });
        } catch (err) {
            channel.send(err, { code: "js", split: true });
        }
    },
};