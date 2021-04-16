var { MessageEmbed } = require('discord.js')
module.exports.run = async (client,message,args,prefix) => {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    function getMB() {
    var vara = Math.round(used * 100) / 100
    var mb = vara.toString().slice(0, -3)
    return [mb + ' MB']
    }
    var os = require('os');
    var usage = require('cpu-percentage');
    var cpu = Math.round(usage().percent)
    var core = os.cpus()[0].model;
    var em = new MessageEmbed()
    .setTitle('Stats')
    .addField('Memory usage', '`' + getMB() + '`')
    .addField('CPU Percentage', '`' + cpu + ' %`')
    .addField('Platform', '`' + process.platform.toUpperCase() + '`',true)
    .addField('Commands', '`' + client.commands.size + '`', true)
    .addField('Core', core, true)
    .setColor(client.color)
    message.channel.send(em)
}

module.exports.help = {
    name: "stats",
    aliases: ['stat', 'info', 'bot-info'],
    desc: 'Show information about the bot.',
    type: 'Info'
}