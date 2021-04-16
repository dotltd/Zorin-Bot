const {Util} = require('discord.js')
const ytdl = require('ytdl-core')
var ytapi = require('simple-youtube-api');
var youtube = new ytapi('AIzaSyC7Yz9199ep6HejKf81Fp4KS0QK7ABGhgI')
var {MessageEmbed} = require('discord.js')
var adv = require('ms-advanced')
module.exports.run = async(client,message,args) => {
	const { channel } = message.member.voice;
	if(!message.member.hasPermission('MANAGE_MESSAGES')) return client.error('NO', 'Manage messages')
    if(!args[0]) return client.error('Enter an URL please!')
		if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		if (!permissions.has('SPEAK')) return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
        const serverQueue = client.queue.get(message.guild.id);
        const videos = await youtube.searchVideos(args.join(' '), 1);
		const songInfo = await ytdl.getInfo(videos[0].id) || await ytdl.getInfo(args[0].replace(/<(.+)>/g, '$1'));
		if(!songInfo) return client.error('This song is unavalible')
		var tims = adv(songInfo.length_seconds + "s")
		var iks = adv(tims)
		const song = {
			id: songInfo.video_id,
			title: Util.escapeMarkdown(songInfo.title),
			url: songInfo.video_url,
			time: iks,
			thumb: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
			like: songInfo.likes,
			dislike: songInfo.dislikes
		};
		if (serverQueue) {
			serverQueue.songs.push(song);
			return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
		}

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: channel,
			connection: null,
			songs: [],
			volume: 2,
			playing: true
		};
		client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		const play = async song => {
			const queue = client.queue.get(message.guild.id);
			if (!song) {
				queue.voiceChannel.leave();
				client.queue.delete(message.guild.id);
				return;
			}

			const dispatcher = queue.connection.play(ytdl(song.url))
				.on('finish', () => {
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on('error', error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);
			const like = client.emojis.cache.get("635256484682530825");
			const dislike = client.emojis.cache.get("635273376285589504");
			function numco(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			if(!song.time) song.time = "Can't Fetch"
			var queueem = new MessageEmbed()
			.setTitle(song.title)
			.setColor(client.color)
			.setURL(song.url)
			.addField('Length', song.time, true)
			.setThumbnail(song.thumb)
			.addField(`${like}Likes`, numco(songInfo.likes), true).addField(`${dislike}Dislikes`, numco(songInfo.dislikes), true)
			queue.textChannel.send(queueem);
		};

		try {
			const connection = await channel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			client.queue.delete(message.guild.id);
			await channel.leave();
			return client.error(`I could not join the voice channel: ${error}`);
		}
}



module.exports.help = {
    name: 'play',
    aliases: ['p'],
    desc: 'Play youtube video by URL.',
    type: 'music'
}