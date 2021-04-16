var discord = require('discord.js')
var bin = require("hastebin-gen");
var chalk = require('chalk')
module.exports.run = async (client,message,args,prefix) => {
    var owners = require("../secret.json").ids.admin;
    
    if (!owners.includes(message.author.id)) return client.error('Developers only');
    const { exec } = require('child_process');
    var yourscript = exec(args.join(' '),
        (error, stdout, stderr) => {
            if(stdout.length > 2000) {
              bin(stdout, { extension: "js" }).then(link => {
                message.channel.send(link)
              })
              return;
            }
            if(stderr) {
              if (error !== null) {
                var erremb = new discord.MessageEmbed()
                .setTitle('Result')
                .setDescription(`\`\`\`shell\n${stderr}\n\`\`\``)
                .setFooter(client.footer)
                .setColor(client.color)
                message.channel.send(erremb);
                return;
              }
            }
            var emb = new discord.MessageEmbed()
            .setTitle('Result')
            .setDescription(`\`\`\`shell\n${stdout}\n\`\`\``)
            .setFooter(client.footer)
            .setColor(client.color)
            message.channel.send(emb);
            console.log(chalk.green('[ Shell ] ') + args.join(' '))
        });
}


module.exports.help = {
    name: 'shell',
    aliases: ['sh'],
    desc: "Run console command.",
    type: 'DEV'
}