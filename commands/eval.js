var { MessageEmbed } = require('discord.js');
const { fstat } = require('fs');
var bin = require("hastebin-gen");
var fs = require('fs');
module.exports.run = async(client,message,args,prefix) => {
    function clean(text) {
        if (typeof text === "string")
          return text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
      }
      var owners = require("../secret.json").ids.admin;
    
      if (!owners.includes(message.author.id)) return client.error('Developers only');
  
      try {
        const code = args.join(" ");
        let evaled = eval(code);
  
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
        if (evaled === "Promise { <pending> }") return;
        message.react("✅");
        if(clean(evaled).length > 2000) {
          fs.writeFileSync('/home/decent/node/commands/output.txt', clean(evaled), function(err) {
            if(err) throw err;
          })
          return;
        }
        var emb = new MessageEmbed()
        .setTitle('Result')
        .setDescription(`\`\`\`js` + '\n' + clean(evaled)+ `\n` + `\`\`\``)
        .setFooter(client.footer, client.user.avatarURL())
        .setColor(client.color)
        message.channel.send(emb);
      } catch (err) {
        message.react("⚠");
        var emb = new MessageEmbed()
        .setTitle('Result')
        .setDescription(`\`\`\`js` + '\n' + clean(err)+ `\n` + `\`\`\``)
        .setFooter(client.footer, client.user.avatarURL())
        .setColor(client.color)
        message.channel.send(emb);
      }  
}


module.exports.help = {
    name: "eval",
    aliases: ['run'],
    desc: "Eval scripts in-line.",
    type: 'DEV'
}