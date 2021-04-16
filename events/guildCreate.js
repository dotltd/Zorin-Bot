const {client} = require('../zorin')
var guilds = "825019709899669504";
client.on("guildCreate", (guild, message) => {
    client.channels.cache.get(guilds).send(
      `
  I have joined a guild with name: **${guild.name}**. A little information about it:
  Acronym and guildID: **${guild.nameAcronym} | ${guild.id}**
  Members cound: **${guild.memberCount}**
  Roles count: **${guild.roles.cache.size}**
  Channels count: **${guild.channels.cache.size}**
  CreatedAt: **${guild.createdAt.toString().slice(4, -32)}**
  IconURL: ${guild.iconURL()}
  **This is our ${client.guilds.cache.size} guild**`,
      client
    );
    setTimeout(() => {
      console.log(`I have joined a guild: ${guild.name} | ${guild.id}`);
    }, 1000);
});