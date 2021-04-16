module.exports.run = async(client,message,args,prefix) => {
    
    const amount = parseInt(args[0]);

    if (isNaN(amount)) {
      return client.error("That doesn't seem to be a valid number.");
    }

    if (isNaN(amount)) {
      return client.error("That doesn't seem to be a valid number.");
    } else if (amount < 1 || amount > 99) {
      return client.error("You need to input a number between 1 and 99.");
    }
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send("I can't delete messages");
    }
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send("**You can't delete messages**");
    }
    message.delete();
    message.channel.bulkDelete(amount + 1, true);
    message.channel
      .send(`**Succesfully deleted ${amount} messages! 🚮**`)
      .then(message => message.delete({ timeout: 10000}));
}

module.exports.help = {
    name: 'clear',
    aliases: ['clean', 'purge', 'delete'],
    desc: 'Purge messages from current channel.',
    type: "Moderation"
}