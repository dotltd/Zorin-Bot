module.exports.run = async(client,message,args,prefix) => {
    
    message.channel.send("Metering").then(m => {
        m.edit(`Ping **${Math.round(client.ws.ping)}** ms`);
      })
}


module.exports.help = {
    name: 'ping',
    aliases: ['pong'],
    desc: "Show bot's latency.",
    type: 'Utils'
}