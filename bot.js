const { VK } = require("vk-io");

const middlewares = require("./middlewares");
const { createHearCommand } = require("./helpers");
const {
    startController,
    helpController,
    aboutMeController,
    backToMainController,
} = require("./controllers");

const vk = new VK();

vk.setOptions({
    token: process.env.BOT_TOKEN,
    apiMode: "parallel_selected",
    webhookPath: "/webhook/secret-path",
});

const { updates } = vk;
const hearCommand = createHearCommand(updates);

// Skip outbox message and handle errors
updates.use(middlewares.outboxMessageAndErrors);
// Handle message payload
updates.use(middlewares.messagePayload);

hearCommand("start", [/^\/start$/, /^Начать$/i], startController);
hearCommand("help", helpController);
hearCommand("aboutme", [/^\/aboutme$/, /\u{1F464} Обо мне/iu, /\u{2139} Информация/iu], aboutMeController.informationAction);
hearCommand("skills", [/^\/skills$/, /\u{2B50} Навыки/iu], aboutMeController.skillsAction);
hearCommand("back", [/^\/back$/, /\u{1F3E0} В гл.меню/iu], backToMainController);

module.exports = vk;