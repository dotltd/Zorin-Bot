module.exports.run = async(client,message,args) => {
    const { channel } = message.member.voice;
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return client.error('NO', 'Manage messages')
    if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end('Stop command has been used!');
    message.channel.send('☠ Stopped')
}

module.exports.help = {
    name: 'stop',
    aliases: [],
    desc: 'Stop the playing video.',
    type: 'Music'
}