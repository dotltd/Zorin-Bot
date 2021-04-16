var Discord = require('discord.js')
var { MessageEmbed } = require('discord.js')
module.exports.run = async(client,message,args,prefix) => {
    
    let pchat =
      message.guild.channels.cache.filter(c => c.type === "text").size +
      message.guild.channels.cache.filter(c => c.type === "voice").size;
    let emb = new Discord.MessageEmbed()
      .setColor(client.color)
      .setTitle("Server Info")
      .addField(`Server Name`, message.guild.name, true)
      .addField(`Server Name Acronym`, message.guild.nameAcronym, true)
      .setThumbnail(message.guild.iconURL())
      .addField(`Owner`, message.guild.owner, true)
      .addField("Owner Name", message.guild.owner.user.tag, true)
      .addField(`ID`, message.guild.id, true)
      .addField(`Roles Count`, message.guild.roles.cache.size, true)
      .addField(`Emojis Count`, message.guild.emojis.cache.size, true)
      .addField(`Members Count`, message.guild.members.cache.size, true)
      .addField(
        `Users Count`,
        message.guild.members.cache.filter(member => !member.user.bot).size,
        true
      )
      .addField(
        `Bots Count`,
        message.guild.members.cache.filter(member => member.user.bot).size,
        true
      )
      .addField(
        "Online",
        message.guild.members.cache.filter(m => m.presence.status === "online").size,
        true
      )
      .addField(
        "Idle",
        message.guild.members.cache.filter(m => m.presence.status === "idle").size,
        true
      )
      .addField(
        "Do not disturb",
        message.guild.members.cache.filter(m => m.presence.status === "dnd").size,
        true
      )
      .addField(
        "Offline",
        message.guild.members.cache.filter(m => m.presence.status === "offline").size,
        true
      )
      .addField(
        "Channels (all): " + pchat,
        "⌨ Text: " +
          message.guild.channels.cache.filter(c => c.type === "text").size +
          "\n" +
          "🎙 Voice: " +
          message.guild.channels.cache.filter(c => c.type === "voice").size,
        true
      )
      .addField(`AFK Channel`, message.guild.afkChannel, true)
      .addField(`AFK Channel ID`, message.guild.afkChannelID, true)
      .addField("Afk Timeout", message.guild.afkTimeout, true)
      .addField(`System Channel`, message.guild.systemChannel, true)
      .addField(`System Channel ID`, message.guild.systemChannelID, true)
      .addField(`Verification Level`, message.guild.verificationLevel, true)
      .addField(`Server Region`, message.guild.region, true)
      .addField(`Server Created`, message.guild.createdAt, true);
    message.channel.send(emb).catch(error => {
      message.channel.send(
        "An error occurred."
      );
    });
}

module.exports.help = {
    name: "server-info",
    aliases: ['sinfo'],
    desc: 'Show information about your server.',
    type: 'Info'
}