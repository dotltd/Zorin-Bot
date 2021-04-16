const {client} = require('../zorin');
var mysql = require('mysql')
var que = mysql.createConnection({
    host: 'localhost',
    user: 'decent',
    password: 'decentishereBABY1!'
});
var hook = require('quick.hook')
var Discord = require('discord.js')
var math = require('mathjs')
client.on("message", async message => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    que.query('select * from bot.prefixes where guild_id="' + message.guild.id + '"', function(err, resp) {
        var prefix = resp[0];
        if(prefix) prefix = resp[0].prefix;
        if(!prefix) prefix = '-'
        setprocess(prefix)
    })
    async function setprocess (pref) {
    const clientprefix = new RegExp(`^<@!?${client.user.id}> `);
    var prefix = message.content.match(clientprefix)
      ? message.content.match(clientprefix)[0]
      : pref;
    let args = message.content.slice(prefix.length).trim().split(/ +/);
    let cmd = args.shift().toLowerCase();
    let command;
    client.color = "#7075E2"
    client.footer = '*Made with :heart: by decent*'
    client.getMembersSize = function() {
        return math.evaluate(client.guilds.cache.map(g => g.members.cache.size).join('+'));
    }
    client.error = function(reason, missPerms) {
        if (!missPerms) {
          const embed = new Discord.MessageEmbed()
            .setTitle("ERROR")
            .setColor("ff0000")
            .setDescription("Reason : **" + reason + "**")
            .setFooter(client.footer, client.user.avatarURL())
            .setTimestamp();
          return message.channel.send({ embed })
        } else {
          const embed = new Discord.MessageEmbed()
            .setTitle("Permission missed")
            .setColor("ff0000")
            .setDescription(
              "You do not have enough permissions to use this command. \Missing permission: `" +
                missPerms +
                "`"
            )
            .setFooter(client.footer, client.user.avatarURL())
            .setTimestamp();
          return message.channel.send({ embed })
        }
      }
    client.succ = function (msg) {
        const embed = new Discord.MessageEmbed()
          .setTitle("Success")
          .setColor("0097f6")
          .setDescription(msg)
          .setFooter(client.footer, client.user.avatarURL())
          .setTimestamp();
        return message.channel.send({ embed })
    }
    if (!message.content.startsWith(prefix)) return;

    if (client.commands.has(cmd)) {
        command = client.commands.get(cmd);
    } else {
        command = client.commands.get(client.aliases.get(cmd));
    }
    if (command) command.run(client, message, args, prefix);
}
});
