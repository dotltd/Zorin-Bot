var {MessageEmbed} = require('discord.js')
var math = require('mathjs')
module.exports.run = async(client,message,args,prefix) => {
    let f = args.join(" ");
    if (!args[0]) return client.error("Please, enter number!");
    let resp;
    try {
      resp = math.evaluate(f);
    } catch (e) {
      return message.channel.send("Please, enter vaild calculation");
    }
    let em = new MessageEmbed()
      .setFooter("Calculator", client.user.avatarURL())
      .setTitle("Math")
      .addField("Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
      .addField("Output", `\`\`\`js\n${resp}\`\`\``)
      .setColor(client.color);
    message.channel.send(em);
}


module.exports.help = {
    name: "math",
    aliases: ['calc', 'roun'],
    desc: "Simple in-line calculator",
    type: 'Utils'
}