module.exports.run = async(client,message,args,prefix) => {
    
    if (!message.member.hasPermission("ADMINISTRATOR")) return client.error("**You can not say!**");
    let text1 = args.join(" ").replace("@everyone", "everyone");
    let text = text1.replace("@here", "here");
    if (!text) return message.channel.send("Enter some text");
    message.channel.send(text);
    message.delete()
}

module.exports.help = {
    name: "say",
    aliases: ['reply'],
    desc: 'Bot will repeate your message.',
    type: "Moderation"
}