const fetch = require('node-fetch');
const fs = require('fs-extra');

module.exports = {
    config: {
        name: "anigif",
        version: "1.1",
        author: "SiAM",
        role: 0,
        category: "Fun",
        shortDescription: "bot will send you anime gif based on tag.",
        longDescription: "bot will send you anime gif based on tag.",
        guide: {
            en: "{pn} <tag> |type only {pn} to see tag list",
        }
    },

    onStart: async function ({ api, args, message, event }) {

        const availableTags = ["bite", "blush", "comfy", "cry", "cuddle", "dance", "eevee","fluff","holo","hug","icon","kiss","kitsune","lick","neko","okami","pat","poke","senko","sairo","slap","smile","tail","tickle","anal", "blowjob","cum","fuck","pussylick","solo","threesome_fff","threesome_ffm","threesome_mmf","yaio","yuri"];

        const tag = args[0];

        if (!availableTags.includes(tag)) {
            let invalidTagMessage = `Invalid tag "${tag}" ⚠️.\nPlease use :\n`;
            invalidTagMessage += "bite, blush, comfy, cry, cuddle, dance, eevee, fluff, holo, hug, icon, kiss, kitsune, lick, neko, okami, pat, poke, senko, sairo, slap, smile, tail, tickle.";

            return message.reply(invalidTagMessage);
        }

        const isNsfw = ["anal", "blowjob","cum","fuck","pussylick","solo","threesome_fff","threesome_ffm","threesome_mmf","yaio","yuri"].includes(tag);

        if (isNsfw) {
            const msgSend = await message.reply("This tag is not allowed in this thread.");
            setTimeout(async () => {
                await message.unsend(msgSend.messageID);
            }, 100000);
            return;
        }

        const endpoint = isNsfw
            ? `https://purrbot.site/api/img/nsfw/${tag}/gif`
            : `https://purrbot.site/api/img/sfw/${tag}/gif`;

        const response = await fetch(endpoint);

        if (response.status !== 200) {
            return message.reply("Failed to get image.");
        }

        const data = await response.json();
        const gif = data.link;

        const gifResponse = await fetch(gif);
        const buffer = await gifResponse.buffer();

        fs.writeFileSync(`${tag}_anime.gif`, buffer);

        message.reply({
            body: ` ${tag} 😗👇🤐 !`,
            attachment: fs.createReadStream(`${tag}_anime.gif`)
        }, () => fs.unlinkSync(`${tag}_anime.gif`));
    }
};


khankir pola tor ma lage phon des ken - dhon fatay fa