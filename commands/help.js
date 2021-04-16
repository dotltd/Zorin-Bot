var { MessageEmbed } = require('discord.js')
module.exports.run = async(client,message,args,prefix) => {
    var untyped = [];
    var utils = [];
    var dev = [];
    var info = [];
    var mod = [];
    var eco = [];
    var mus = [];
    client.commands.map(cmd => {
        if(!cmd.help.type) untyped.push(cmd.help.name);
        if(cmd.help.type.match(/Dev/gi)) dev.push(cmd.help.name);
        if(cmd.help.type.match(/Info/gi)) info.push(cmd.help.name);
        if(cmd.help.type.match(/Moderation/gi)) mod.push(cmd.help.name);
        if(cmd.help.type.match(/Utils/gi)) utils.push(cmd.help.name);
        if(cmd.help.type.match(/Economy/gi)) eco.push(cmd.help.name);
        if(cmd.help.type.match(/Music/gi)) mus.push(cmd.help.name);
    })
    if(!args[0]) {
        var helpem = new MessageEmbed()
        .setTitle('All Categories')
        .setColor(client.color)
        .setAuthor('Zorin', client.user.avatarURL())
        .setDescription(`Hello, please, tell us the command category
        ${prefix}help **M** - Moderation commands list
        ${prefix}help **D** - Developer commands list
        ${prefix}help **U** - Utils commands list
        ${prefix}help **E** - Economy commands list
        ${prefix}help **I** - Info commands list
        ${prefix}help **T** - Uncategorized commands list
        ${prefix}help **P** - Music commands list`)
        return message.channel.send(helpem)
    }
    if(args[0].toUpperCase() === 'M') {
        var helpem = new MessageEmbed()
        .setTitle('Moderation')
        .setColor(client.color)
        .setAuthor('Zorin', client.user.avatarURL())
        client.commands.map(g => {
            mod.forEach(name => {
                if(g.help.name === name) {
                    if(!g.help.desc) g.help.desc = 'No description';
                    helpem.addField(prefix + name, g.help.desc)
                }
            })
        })
        return message.channel.send(helpem)
    }
    if(args[0].toUpperCase() === 'D') {
        var helpem = new MessageEmbed()
        .setTitle('Developer')
        .setColor(client.color)
        .setAuthor('Zorin', client.user.avatarURL())
        client.commands.map(g => {
            dev.forEach(name => {
                if(g.help.name === name) {
                    if(!g.help.desc) g.help.desc = 'No description';
                    helpem.addField(prefix + name, g.help.desc)
                }
            })
        })
        return message.channel.send(helpem)
    }
    if(args[0].toUpperCase() === 'U') {
        var helpem = new MessageEmbed()
        .setTitle('Utils')
        .setColor(client.color)
        .setAuthor('Zorin', client.user.avatarURL())
        client.commands.map(g => {
            utils.forEach(name => {
                if(g.help.name === name) {
                    if(!g.help.desc) g.help.desc = 'No description';
                    helpem.addField(prefix + name, g.help.desc)
                }
            })
        })
        return message.channel.send(helpem)
    }
    if(args[0].toUpperCase() === 'E') {
        var helpem = new MessageEmbed()
        .setTitle('Economy')
        .setColor(client.color)
        .setAuthor('Zorin', client.user.avatarURL())
        client.commands.map(g => {
            eco.forEach(name => {
                if(g.help.name === name) {
                    if(!g.help.desc) g.help.desc = 'No description';
                    helpem.addField(prefix + name, g.help.desc)
                }
            })
        })
        return message.channel.send(helpem)
    }
    if(args[0].toUpperCase() === 'I') {
        var helpem = new MessageEmbed()
        .setTitle('Info')
        .setColor(client.color)
        .setAuthor('Zorin', client.user.avatarURL())
        client.commands.map(g => {
            info.forEach(name => {
                if(g.help.name === name) {
                    if(!g.help.desc) g.help.desc = 'No description';
                    helpem.addField(prefix + name, g.help.desc)
                }
            })
        })
        return message.channel.send(helpem)
    }
    if(args[0].toUpperCase() === 'T') {
        var helpem = new MessageEmbed()
        .setTitle('Info')
        .setColor(client.color)
        .setAuthor('Zorin', client.user.avatarURL())
        if(untyped[0]) {
        client.commands.map(g => {
            untyped.forEach(name => {
                if(g.help.name === name) {
                    if(!g.help.desc) g.help.desc = 'No description';
                    helpem.addField(prefix + name, g.help.desc)
                }
            })
        })
    }
    if(!untyped[0]) {
        helpem.setDescription('No commands in this category')
    }
        return message.channel.send(helpem)
    }
    if(args[0].toUpperCase() === 'P') {
        var helpem = new MessageEmbed()
        .setTitle('Info')
        .setColor(client.color)
        .setAuthor('Zorin', client.user.avatarURL())
        client.commands.map(g => {
            mus.forEach(name => {
                if(g.help.name === name) {
                    if(!g.help.desc) g.help.desc = 'No description';
                    helpem.addField(prefix + name, g.help.desc)
                }
            })
        })
        return message.channel.send(helpem)
    }
}

module.exports.help = {
    name: "help",
    aliases: ['help', 'cmds', 'commands'],
    desc: 'Show all commands list',
    type: 'Info'
}