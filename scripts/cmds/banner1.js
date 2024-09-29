const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "bnar",
    aliases: ["gfxs"],
    version: "1.0",
    author: "Samir",
    countDown: 35,
    role: 0,
    shortDescription: "Make a GFX banner",
    longDescription: "Make a GFX banner",
    category: "gfx",
    guide: {
      en: "{pn} your text here",
    }
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const prefix = "*"; // Define your prefix here
    const body = event.body;

    // Check if the message starts with the prefix and command name
    if (body.startsWith(prefix + "bnar") || body.startsWith(prefix + "gfxs")) {
      const args = body.slice(prefix.length).trim().split(/ +/).slice(1);
      const text = args.join(" ");

      if (text.trim()) {
        try {
          const imageUrl = https://news.orgasom.shop/api/banner.php?text=${encodeURIComponent(text)};

          // Fetch image data from the URL
          const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const imagePath = __dirname + '/tmp/gfx_banner.png';

          // Save the image data to a file
          fs.writeFileSync(imagePath, Buffer.from(response.data, 'binary'));

          // Send the message with the image attachment
          return message.reply({
            body: "╔════ஜ۩۞۩ஜ═══╗\n\n🥰 Here is your GFX banner ✅\n╚════ஜ۩۞۩ஜ═══╝",
            attachment: fs.createReadStream(imagePath)
          });
        } catch (error) {
          console.error('Error:', error.message);
          return message.reply('Failed to create GFX banner.');
        }
      } else {
        return message.reply(Please provide text for the banner.);
      }
    }
  }
};