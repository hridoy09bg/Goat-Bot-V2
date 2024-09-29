module.exports = {
  config: {
    name: "addbal",
    aliases: ["addbalance"],
    version: "1.0",
    author: "Hridoy",
    countDown: 5,
    role: 2, // Only admins can use this command
    description: {
      vi: "thêm số tiền vào tài khoản của người được tag",
      en: "add money to the account of the tagged person"
    },
    category: "economy",
    guide: {
      vi: "   {pn} <số tiền> <@tag>: thêm số tiền vào tài khoản của người được tag",
      en: "   {pn} <amount> <@tag>: add money to the account of the tagged person"
    }
  },

  langs: {
    vi: {
      addedMoney: "Đã thêm %1$ vào tài khoản của %2",
      missingAmount: "Bạn cần nhập số tiền cần thêm",
      noTag: "Bạn cần tag một người để thêm tiền"
    },
    en: {
      addedMoney: "Added %1$ to the account of %2",
      missingAmount: "You need to specify the amount to add",
      noTag: "You need to tag a person to add money"
    }
  },

  onStart: async function ({ message, usersData, event, getLang }) {
    const { senderID, mentions, body } = event;
    const args = body.split(" ");

    if (args.length < 2) {
      return message.reply(getLang("missingAmount"));
    }

    const amount = parseInt(args[1]);
    if (isNaN(amount)) {
      return message.reply(getLang("missingAmount"));
    }

    if (Object.keys(mentions).length === 0) {
      return message.reply(getLang("noTag"));
    }

    const uids = Object.keys(mentions);
    for (const uid of uids) {
      let userMoney = await usersData.get(uid, "money");
      userMoney += amount;
      await usersData.set(uid, { money: userMoney });
      message.reply(getLang("addedMoney", amount, mentions[uid].replace("@", "")));
    }
  }
};
