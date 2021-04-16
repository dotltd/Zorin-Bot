const discord = require("discord.js");
const token = require("./secret.json").auth.token;
const client = new discord.Client({
  disableEveryone: true
});
require("./functions")(client);

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.afk = new Map();
client.queue = new Map();

module.exports = {
  client: client
};

client.login(token);