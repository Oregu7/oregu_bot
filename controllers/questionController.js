const backToMainController = require("./backToMainController");
const { Markup } = require("../helpers");
const { UserModel } = require("../models");

async function baseAction(ctx) {
    const user = await UserModel.getOrCreate(ctx);
    const message = `${user.firstName}, пожалуйста напишите Ваш вопрос`;
    const keyboard = Markup.keyboard([
        Markup.negativeButton("Отмена", "cancel"),
    ]);

    return ctx.send({ message, keyboard });
}

async function cancelAction(ctx) {
    await ctx._clearState();
    return backToMainController(ctx);
}

async function questionAction(ctx) {
    return ctx.send({ message: `Ваш вопрос: ${ctx.text}` });
}

module.exports = {
    baseAction,
    cancelAction,
    questionAction,
};