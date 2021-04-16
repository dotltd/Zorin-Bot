var Discord = require('discord.js')

module.exports.run = async(client,message,args,prefix) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return client.error(0, "MANAGE_MESSAGES");
      }
      if (message.content == prefix + "embed") {
        return client.error(
          "Usage: {description: description text}\n{title: title text}\n{field: field name | value: field text}\n{timestamp: date}\n{footer: footer text}\n{color: #hex}\n{image: url}\n{thumbnail: url} \n {author: value}"
        );
      }
      try {
        let text = args.join(" ").replace(/\n/g, "\\n");
        let embed = new Discord.MessageEmbed();
        let footer = text.match(/{footer:(.*?)( \| icon: ?(.*?))?}/i);
        if (footer !== null) {
          embed.setFooter(footer[1], footer[3]);
        }
        let image = text.match(/{image: ?(.*?)}/i);
        if (image !== null) {
          embed
            .attachFiles({
            attachment: image[1],
            file: image[1].substring(image[1].lastIndexOf("/") + 1)
            })
            .setImage(
              "attachment://" + image[1].substring(image[1].lastIndexOf("/") + 1)
            );
        }
        let thumb = text.match(/{thumbnail: ?(.*?)}/i);
        if (thumb !== null) {
          embed
            .attachFiles({
              attachment: thumb[1],
              file: thumb[1].substring(thumb[1].lastIndexOf("/") + 1)
            })
            .setThumbnail(
              "attachment://" + thumb[1].substring(thumb[1].lastIndexOf("/") + 1)
            );
        }
        let author = text.match(
          /{author:(.*?)( \| icon: ?(.*?))?( \| url: ?(.*?))?}/i
        );
        if (author !== null) {
          embed.setAuthor(author[1], author[3], author[5]);
        }
        let title = text.match(/{title:(.*?)}/i);
        if (title !== null) {
          embed.setTitle(title[1]);
        }
        let url = text.match(/{url: ?(.*?)}/i);
        if (url !== null) {
          embed.setURL(url[1]);
        }
        let description = text.match(/{description:(.*?)}/i);
        if (description !== null) {
          embed.setDescription(description[1].replace(/\\n/g, "\n"));
        }
        let color = text.match(/{colou?r: ?(.*?)}/i);
        if (color !== null) {
          embed.setColor(color[1]);
        }
        let timestamp = text.match(/{timestamp(: ?(.*?))?}/i);
        if (timestamp !== null) {
          if (timestamp[2] === undefined || timestamp[2] === null)
            embed.setTimestamp(new Date());
          else embed.setTimestamp(new Date(timestamp[2]));
        }
        let fields = text.match(
          /{field: ?(.*?) \| value: ?(.*?)( \| inline)?}/gi
        );
        if (fields !== null) {
          fields.forEach(item => {
            if (
              item[1] == null ||
              item[2] == null ||
              typeof item[1] === "undefined" ||
              typeof item[2] === "undefined"
            )
              return;
            let matches = item.match(
              /{field: ?(.*?) \| value: ?(.*?)( \| inline)?}/i
            );
            embed.addField(matches[1], matches[2], matches[3] != null);
          });
        }
        message.channel.send({ embed })
        message.delete({timeout: 1000});
      } catch (e) {
          client.error(e)
      }
}

module.exports.help = {
    name: "embed",
    aliases: ["emgen"],
    desc: 'Generate an embed message.',
    type: "Moderation"
}