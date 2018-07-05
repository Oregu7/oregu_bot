const { VK } = require("vk-io");

const middlewares = require("./middlewares");
const { startController, helpController } = require("./controllers");
const { createHearCommand } = require("./helpers");

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

module.exports = vk;