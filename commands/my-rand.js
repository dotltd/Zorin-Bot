module.exports.run = async(client,message,args,prefix) => {
    function getMyInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      let g = parseInt(args[0]);
      let i = parseInt(args[1]);
      if (isNaN(i)) {
        return client.error("This isn't a vaild number!");
      }
      if (isNaN(g)) {
        return client.error("This isn't a vaild number!");
      }
      let bit = new MessageEmbed()
        .setAuthor("Random to " + args[1])
        .setTitle("RANDOM TO YOUR NUBER IS...")
        .setDescription(getMyInt(g, i))
        .setColor(client.color)
        .setFooter(footer, client.user.avatarURL())
      message.channel.send(bit).catch(error => {
        message.channel.send(
          "Hmmmm...\n**Something went wrong!**\nI have an error in my console! Please check my perms and try again!"
        );
      });
}


module.exports.help = {
    name: "random",
    aliases: ['rand'],
    desc: "Command that chooses the random number",
    type: 'Utils'
}