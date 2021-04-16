var {MessageEmbed} = require('discord.js')
module.exports.run = async(client,message,args) => {
    const serverQueue = client.queue.get(message.guild.id);
	if (!serverQueue) return client.error('There is nothing playing.');
    const like = client.emojis.cache.get("635256484682530825");
    const dislike = client.emojis.cache.get("635273376285589504");
    function numco(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    if(!serverQueue.songs[0].time) serverQueue.songs[0].time = "Can't Fetch"
    var queueem = new MessageEmbed()
    .setTitle(serverQueue.songs[0].title)
    .setColor(client.color)
    .setURL(serverQueue.songs[0].url)
    .addField('Length', serverQueue.songs[0].time, true)
    .setThumbnail(serverQueue.songs[0].thumb)
    .addField(`${like}Likes`, numco(serverQueue.songs[0].like), true).addField(`${dislike}Dislikes`, numco(serverQueue.songs[0].dislike), true)
    message.channel.send(queueem);
}

module.exports.help = {
    name: 'np',
    aliases: ['now-playing'],
    desc: 'Show currently playing song.',
    type: 'music'
}