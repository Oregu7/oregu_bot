const { getMainKeyboard, compileMessage } = require("../helpers");
const { UserModel } = require("../models");

module.exports = async(ctx) => {
    const user = await UserModel.getOrCreate(ctx);

    const message = `Oregu Bot - это бот, который ознакомит Вас с моим портфолио.

    Используйте эти команды, чтобы управлять ботом:\n
    /aboutme - информация обо мне
    /works - мои работы
    /skills - мои навыки
    /question - задать вопрос
    /help - список команд
    /cancel - отменить действие

    ⚠️${user.firstName}, если у Вас возникли проблемы, Вы можете задать мне вопрос.`;

    return await ctx.send({
        message: compileMessage(message),
        keyboard: getMainKeyboard(),
        //attachment: "photo-168410376_456239021",
    });
};