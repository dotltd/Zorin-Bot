var {MessageEmbed} = require('discord.js')
module.exports.run = async(client,message,args,prefix) => {
    if (!args.join(" ")) return;
    let liam = args.join('%20');
    let Embed = new MessageEmbed()
      .setImage(
        `http://api.qrserver.com/v1/create-qr-code/?data=${liam}&size=1000x1000`
      )
      .setTitle("QR Code")
      .setColor(client.color)
      .setFooter("Requested by: " + message.author.tag, client.user.avatarURL());
    message.channel.send(Embed);
}


module.exports.help = {
    name: "qrgen",
    aliases: ['qrcode', 'qr'],
    desc: 'Generate an unique QR-code.',
    type: 'Utils'
}