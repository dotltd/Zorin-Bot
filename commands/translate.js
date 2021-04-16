var request = require('request')
var { MessageEmbed } = require('discord.js')
module.exports.run = async(client,message,args,prefix) => {
        
        let lng = args[0];
        if (
          lng != "aa" &&
          lng != "ab" &&
          lng != "af" &&
          lng != "am" &&
          lng != "an" &&
          lng != "ar" &&
          lng != "as" &&
          lng != "ay" &&
          lng != "az" &&
          lng != "ba" &&
          lng != "be" &&
          lng != "bg" &&
          lng != "bh" &&
          lng != "bn" &&
          lng != "bo" &&
          lng != "br" &&
          lng != "ca" &&
          lng != "co" &&
          lng != "cs" &&
          lng != "cy" &&
          lng != "da" &&
          lng != "de" &&
          lng != "dz" &&
          lng != "el" &&
          lng != "en" &&
          lng != "eo" &&
          lng != "es" &&
          lng != "et" &&
          lng != "eu" &&
          lng != "fa" &&
          lng != "fi" &&
          lng != "fj" &&
          lng != "fo" &&
          lng != "fr" &&
          lng != "fy" &&
          lng != "ga" &&
          lng != "gd" &&
          lng != "gl" &&
          lng != "gn" &&
          lng != "gu" &&
          lng != "gv" &&
          lng != "ha" &&
          lng != "he" &&
          lng != "iw" &&
          lng != "hi" &&
          lng != "hr" &&
          lng != "ht" &&
          lng != "hu" &&
          lng != "hy" &&
          lng != "ia" &&
          lng != "id" &&
          lng != "in" &&
          lng != "ie" &&
          lng != "ii" &&
          lng != "ik" &&
          lng != "io" &&
          lng != "is" &&
          lng != "it" &&
          lng != "iu" &&
          lng != "ja" &&
          lng != "jv" &&
          lng != "ka" &&
          lng != "kk" &&
          lng != "kl" &&
          lng != "km" &&
          lng != "kn" &&
          lng != "ko" &&
          lng != "ks" &&
          lng != "ku" &&
          lng != "ky" &&
          lng != "la" &&
          lng != "li" &&
          lng != "ln" &&
          lng != "lo" &&
          lng != "lt" &&
          lng != "lv" &&
          lng != "mg" &&
          lng != "mi" &&
          lng != "mk" &&
          lng != "ml" &&
          lng != "mn" &&
          lng != "mo" &&
          lng != "mr" &&
          lng != "ms" &&
          lng != "mt" &&
          lng != "my" &&
          lng != "na" &&
          lng != "ne" &&
          lng != "nl" &&
          lng != "no" &&
          lng != "oc" &&
          lng != "om" &&
          lng != "or" &&
          lng != "pa" &&
          lng != "pl" &&
          lng != "ps" &&
          lng != "pt" &&
          lng != "qu" &&
          lng != "rm" &&
          lng != "rn" &&
          lng != "ro" &&
          lng != "ru" &&
          lng != "rw" &&
          lng != "sa" &&
          lng != "sd" &&
          lng != "sg" &&
          lng != "sh" &&
          lng != "si" &&
          lng != "sk" &&
          lng != "sl" &&
          lng != "sm" &&
          lng != "sn" &&
          lng != "so" &&
          lng != "sq" &&
          lng != "sr" &&
          lng != "ss" &&
          lng != "st" &&
          lng != "su" &&
          lng != "sv" &&
          lng != "sw" &&
          lng != "ta" &&
          lng != "te" &&
          lng != "tg" &&
          lng != "th" &&
          lng != "ti" &&
          lng != "tk" &&
          lng != "tl" &&
          lng != "tn" &&
          lng != "to" &&
          lng != "tr" &&
          lng != "ts" &&
          lng != "tt" &&
          lng != "tw" &&
          lng != "ug" &&
          lng != "uk" &&
          lng != "ur" &&
          lng != "uz" &&
          lng != "vi" &&
          lng != "vo" &&
          lng != "wa" &&
          lng != "wo" &&
          lng != "xh" &&
          lng != "yi" &&
          lng != "ji" &&
          lng != "yo" &&
          lng != "zh" &&
          lng != "zh" &&
          lng != "zu"
        )
          return [message.reply("Language not found")];
        let txt = args.join(" ").replace(`${lng}`, "");
        request(
          `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181202T195027Z.a57565d4a85d089a.c0204f150bbaf72674ee2dbdd5d2faa8114b5c47&text=${encodeURIComponent(
            txt
          )}&lang=${lng}`,
          (err, res, body) => {
            let arr = JSON.parse(body);
            let trEmb = new MessageEmbed()
              .setColor(client.color)
              .setTitle(`Translater ${arr.lang}`)
              .addField("Before", `\`\`\`\n${txt}\n\`\`\``)
              .addField("After", `\`\`\`\n${arr.text}\n\`\`\``);
            message.channel.send(trEmb).catch(error => {
              message.channel.send(
                "Hmmmm...\n**Something went wrong!**\nI have an error in my console! Please check my perms and try again!"
              );
            });
          }
        );    
}


module.exports.help = {
    name: "translate",
    aliases: ['t'],
    desc: 'Translate your sentence by google.translate.',
    type: 'Utils'
}