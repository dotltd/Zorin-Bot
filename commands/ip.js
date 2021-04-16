var { MessageEmbed } = require('discord.js')
var fetch = require('node-fetch')
module.exports.run = async(client,message,args) => {
    if(!args[0]) return client.error('Enter proxy, ip or domain')
    fetch('http://ip-api.com/json/' + args[0] + '?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query').then(res => res.json()).then(txt => {
      if(txt.status === 'fail') return client.error('Enter valid domain, ip or host')
      var embed = new MessageEmbed()
      .setTitle('[' + txt.countryCode + '] '+ args[0] + '')
      .addField('Organization', '**' + txt.org + '**')
      .addField('ZIP', '**' + txt.zip + '**')
      .addField('City', '**' + txt.city + '**')
      .addField('Region', '**' + txt.regionName + '**', true)
      .addField('Timezone', '**' + txt.timezone + '**', true)
      .addField('Currency', '**' + txt.currency + '**', true)
      .addField('IP', '**' + txt.query + '**')
      .addField('Continent', "**" + txt.continent + "**")
      .addField('Hosting', txt.hosting ? '**Enabled**':'**Disabled**')
      .setColor(client.color)
      .setFooter(client.footer, client.user.avatarURL())
      message.channel.send(embed)
    })
}

module.exports.help = {
    name: 'ip',
    aliases: [],
    desc: 'Information about IP address or public domain.',
    type: 'Info'
}