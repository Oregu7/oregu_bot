const { getMainKeyboard, compileMessage } = require("../helpers");
const { UserModel } = require("../models");

module.exports = async(ctx) => {
    const user = await UserModel.getOrCreate(ctx);

    const message = `Здравствуйте, ${user.firstName}!
    Я - интерактивный портфолио-bot \u{1F916}`;

    return await ctx.send({
        message: compileMessage(message),
        keyboard: getMainKeyboard(),
        attachment: "photo-168410376_456239021",
    });
};