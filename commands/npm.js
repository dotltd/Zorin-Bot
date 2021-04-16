var fetch = require('node-fetch')
var {MessageEmbed} = require('discord.js')

module.exports.run = async(client,message,args) => {
    if(!args[0]) return client.error('Enter module name')
    fetch('https://registry.npmjs.org/' + args[0]).then(resp => resp.json()).then(json => {
        if(json.error) return client.error('Invalid package name');
        var latest = json['dist-tags'].latest
        var npm = new MessageEmbed()
        .setTitle('NPM Info')
        .addField('Name', json.name,true)
        .addField('Latest version', json['dist-tags'].latest, true)
        .addField('Description', json.versions[latest].description, true)
        .addField('License', json.versions[latest].license, true)
        .addField('Maintainers', json.versions[latest].maintainers.map(m => m.name).join(', '), true)
        .addField('ID', json.versions[latest]._id, true)
        npm.setThumbnail('https://avatars2.githubusercontent.com/u/6078720?s=400&v=4')
        npm.setColor('e83b0f')
        message.channel.send(npm)
    })
}

module.exports.help = {
    name: 'npm',
    aliases: ['module'],
    desc: 'Show information about the project on npmjs.org',
    type: 'Utils'
}