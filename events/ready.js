const {client} = require('../zorin');
const chalk = require('chalk')
client.on("ready", async () => {
    console.log(chalk.blueBright('{Event: ready} Started!'))
    setTimeout(() => {
        client.user.setPresence({ status: "dnd", activity: { name: "Warframe :)", type: "PLAYING"}})
    }, 1000)
});