var Discord = require('discord.js')
var { MessageEmbed } = require('discord.js')
module.exports.run = async(client,message,args,prefix) => {
    message.member
      .send({
        embed: {
          color: client.color,
          description:
            "**Invite to [Zorin](https://discordapp.com/oauth2/authorize?client_id=825004948847984660&permissions=8&scope=bot)**"
        }
      })
      .catch(error => {
        message.channel.send("An error occurred while sending the message.");
      });
    message.channel.send("**Message was sent to your DM**");
}
module.exports.help = {
    name: 'invite',
    aliases: [],
    desc: 'I',
    type: 'Info'
}

