const { getMainKeyboard } = require("../helpers");
const { UserModel } = require("../models");

module.exports = async(ctx) => {
    const user = await UserModel.getOrCreate(ctx);
    const message = `${user.firstName}, выберите пожалуйста интересующий Вас раздел`;
    const keyboard = getMainKeyboard();

    return ctx.send({ message, keyboard });
};