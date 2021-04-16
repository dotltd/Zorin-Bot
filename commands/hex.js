var Discord = require('discord.js')
var { MessageEmbed } = require('discord.js')
module.exports.run = async(client,message,args,prefix) => {
    if (!args[0]) return;
    let colot = args[0];
    let hex = args[0].replace("#", "");
    function hexToRgb(hex) {
      var bigint = parseInt(hex, 16);
      var r = (bigint >> 16) & 255;
      var g = (bigint >> 8) & 255;
      var b = bigint & 255;

      return `${r}, ${g}, ${b}`;
    }
    function HEX2DEC(hex) {
      // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
      if (!/^[0-9A-Fa-f]{1,10}$/.test(hex)) return "#NUM!";

      // Convert hexadecimal number to decimal
      var decimal = parseInt(hex, 16);

      // Return decimal number
      return decimal >= 549755813888 ? decimal - 1099511627776 : decimal;
    }
    function rgbtocmyk(hex) {
      var bigint = parseInt(hex, 16);
      var r = (bigint >> 16) & 255;
      var g = (bigint >> 8) & 255;
      var b = bigint & 255;
      r = r / 255;
      g = g / 255;
      b = b / 255;

      k = Math.min(1 - r, 1 - g, 1 - b);
      c = (1 - r - k) / (1 - k);
      m = (1 - g - k) / (1 - k);
      y = (1 - b - k) / (1 - k);

      c = Math.round(c * 100);
      m = Math.round(m * 100);
      y = Math.round(y * 100);
      k = Math.round(k * 100);

      return `${c}, ${m}, ${y}, ${k}`;
    }
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    function rgbToHsl(r, g, b) {
      var a, add, b, diff, g, h, hue, l, lum, max, min, r, s, sat;
      r = parseFloat(r) / 255;
      g = parseFloat(g) / 255;
      b = parseFloat(b) / 255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      diff = max - min;
      add = max + min;
      hue =
        min === max
          ? 0
          : r === max
          ? ((60 * (g - b)) / diff + 360) % 360
          : g === max
          ? (60 * (b - r)) / diff + 120
          : (60 * (r - g)) / diff + 240;
      lum = 0.5 * add;
      sat =
        lum === 0
          ? 0
          : lum === 1
          ? 1
          : lum <= 0.5
          ? diff / add
          : diff / (2 - add);
      h = Math.round(hue);
      s = Math.round(sat * 100);
      l = Math.round(lum * 100);
      a = parseFloat(b) || 1;
      return `${h}, ${s}, ${l}`;
    }
    function rgbtohsv(r, g, b) {
      var round = Math.round;
      var h, s, v;
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var delta = max - min;

      // hue
      if (delta === 0) {
        h = 0;
      } else if (r === max) {
        h = ((g - b) / delta) % 6;
      } else if (g === max) {
        h = (b - r) / delta + 2;
      } else if (b === max) {
        h = (r - g) / delta + 4;
      }

      h = round(h * 60);
      if (h < 0) h += 360;

      // saturation
      s = round((max === 0 ? 0 : delta / max) * 100);

      // value
      v = round((max / 255) * 100);

      return `${h}, ${s}, ${v}`;
    }
    let emheex = args[0];
    if(emheex.length < 6) return client.error('**Enter new format of hex**')
    let emb = new Discord.MessageEmbed()
      .setTitle("Color")
      .setColor(hex)
      .addField("HEX", `#${hex}`, true)
      .addField("DEC", HEX2DEC(hex), true)
      .addField("RGB", hexToRgb(hex), true)
      .addField("HSL", rgbToHsl(r, g, b), true)
      .addField("CMYK", rgbtocmyk(hex), true)
      .addField("HSV", rgbtohsv(r, g, b), true)
      .setImage(`https://dummyimage.com/2048x2048/${hex}/32353E.png%26text%3D%20`)
      .setFooter('Hex info powered by math', client.user.avatarURL())
    message.channel.send(emb).catch(error => {
      message.channel.send(
        "Hmmmm...\n**Something went wrong!**\nI have an error in my console! Please check my perms and try again!"
      );
    });
}

module.exports.help = {
    name: "hex",
    aliases: ["color-info", "checkhex"],
    desc: "Show color information by it's hex representation.",
    type: 'Info'
}