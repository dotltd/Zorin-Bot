module.exports.run = async(client,message,args,prefix) => {
    
    if (!message.member.hasPermission("KICK_MEMBERS")) {
        return message.channel.send("You haven't got permissions!");
      }
      const memberino = message.mentions.members.first();
      if (!memberino) {
        return message.channel.send("You didn't say about member! =)");
      }
      if (!memberino.kickable) {
        return client.error(
          "I got a permission error."
        );
      }
      let stoppl = message.guild.owner;
      if (memberino === stoppl) {
        return message.channel.send("Owner is not kickable.");
      }
      if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
        return message.channel.send("I have no permission to kick members.");
      }
      let shoblni = message.guild.me;
      if (memberino === shoblni) {
        return message.channel.send("I cannot kick myself.");
      }
  
      let reason = args.slice(1).join(" ");
      memberino.kick(reason);
      client.success('**Kicked successfully**');
}

module.exports.help = {
    name: "kick",
    aliases: ['kk'],
    desc: "Kick member from the server (He can rejoin the server anyway)",
    type: "Moderation"
}