const escape = require("escape-html");
const backToMainController = require("./backToMainController");
const { Markup, getMainKeyboard, compileMessage } = require("../helpers");
const { UserModel } = require("../models");
const { adminId } = require("config").get("bot");

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
    const text = escape(ctx.text || "");
    if (!text.length || text.length < 10) return ctx.send({
        message: "\u{26A0}Минимальная длина вопроса - 10 символов",
    });
    // send confirmation message to user
    const user = await UserModel.getOrCreate(ctx);
    const userMessage = `${user.firstName}, спасибо за Ваш вопрос, я отвечу на него в скором времени \u{1F60A}`;
    await ctx._clearState();
    ctx.send({ message: userMessage, keyboard: getMainKeyboard() });

    // send question to admin
    const attachment = ctx.attachments
        .map((attachmentItem) => attachmentItem.toString())
        .join(",");
    const adminMessage = `\u{2795} Новый вопрос
    От: ${user.firstName} ${user.lastName} - https://vk.com/id${user.userId}\n
    - ${text}`;

    return ctx.vk.api.messages.send({
        message: compileMessage(adminMessage),
        attachment,
        user_id: adminId,
    });
}

module.exports = {
    baseAction,
    cancelAction,
    questionAction,
};