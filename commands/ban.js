var Discord = require('discord.js')
var { MessageEmbed } = require('discord.js')
module.exports.run = async(client,message,args,prefix) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
        return client.error(0, "BAN_MEMBERS");
      }
  
      var memberr = message.mentions.members.first();
      if (!memberr)
        return client.error("Usage ```" + prefix + "ban @user reason```");
      if (!memberr.bannable)
        return client.error(
          "I got a permission error."
        );
      if (memberr === `<@${message.author.id}>`)
        return client.error("You can't ban yourself!");
  
      let reason = args.slice(1).join(" ");
      if (!reason) reason = "No reason provided";
  
      memberr
        .ban(reason)
        .catch(error =>
          message.reply(
            `Sorry ${message.author}, i got an error message: ${error}`
          )
        );
      message.reply(
        `${memberr.user.tag} has been banned by ${message.author.tag} \n Reason: ${reason}`
      );
      let bann = new MessageEmbed()
        .setColor(client.color)
        .setTitle(`Ban!`)
        .setAuthor(client.user.tag)
        .addField(
          "Welcome to gulag!",
          `**You has been banned by ${message.author.tag} \n Reason: ${reason}**`
        )
        .setTimestamp()
        .setFooter(client.footer, client.user.avatarURL());
      memberr.send(bann).catch();
}
module.exports.help = {
  name: 'ban',
  aliases: ['welcome_to_gulag'],
  desc: "Send user to a gulag :)",
  type: "Moderation"
}