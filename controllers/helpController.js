const { Markup, compileMessage } = require("../helpers");
const { UserModel } = require("../models");

module.exports = async(ctx) => {

    const user = await UserModel.getOrCreate(ctx);

    const message = `Здравствуйте, ${user.firstName}!
    Я - интерактивный портфолио-bot \u{1F916}`;

    const keyboard = Markup.keyboard([
        [
            Markup.defaultButton("\u{1F464} Обо мне", "aboutme"),
            Markup.negativeButton("\u{1F5A5} Работы", "works"),
        ],
        Markup.primaryButton("\u{270D} Задать вопрос", "question"),
    ]);

    return await ctx.send({
        message: compileMessage(message),
        //keyboard,
    });
};