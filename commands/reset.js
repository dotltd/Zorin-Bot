module.exports.run = async(client,message,args,prefix) => {
    var owners = require("../secret.json").ids.admin;
    if (!owners.includes(message.author.id)) return client.error('Developers only');
    message.channel
    .send("Resetting...")
    .then(message => client.destroy())
    .then(() => client.login(require("../secret.json").auth.token));
}

module.exports.help = {
    name: "reset",
    aliases: ['reboot', 'reload'],
    desc: 'πΌπππ ππππππ',
    type: 'DEV'
}