var mysql = require('mysql')
var que = mysql.createConnection({
    host: 'localhost',
    user: 'decent',
    password: "decentishereBABY1!"
})
module.exports.run = async(client,message,args,prefix) => {
    
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "Sorry, you don't have permission to change server prefix"
      );
    if (!args.join(" "))
      return message.channel.send(
        "Please provide a prefix to change server prefix"
      );
      que.query('select * from bot.prefixes where guild_id="' + message.guild.id + '"', function(error, response) {
        if(response[0]) {
          que.query(`UPDATE bot.prefixes SET guild_id="${message.guild.id}",prefix="${args.join(' ')}" WHERE guild_id="${message.guild.id}"`)
        }
        if(!response[0]) {
          que.query('INSERT INTO bot.prefixes(`guild_id`, `prefix`) VALUES ("' + message.guild.id + '", "' + args.join(' ') + '")')
        }
        message.channel.send(`Server Prefix has been changed to ${args.join(" ")}`);
      })
}


module.exports.help = {
    name: 'prefix',
    aliases: ['pref'],
    desc: "Change bot's prefix",
    type: "Moderation"
}