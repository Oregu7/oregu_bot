require("dotenv").config();
const { VK } = require("vk-io");

const middlewares = require("./middlewares");
const { Markup, createHearCommand } = require("./helpers");

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

hearCommand("start", async(context, next) => {
    context.state.command = "help";

    await next();
});

hearCommand("help", async(context) => {
    await context.send({
        message: `
			My commands list
			/help - The help
		`,
        keyboard: Markup.keyboard([
            [
                Markup.defaultButton("\u{1F464} Обо мне", "aboutme"),
                Markup.negativeButton("\u{1F5A5} Работы", "works"),
            ],
            Markup.primaryButton("\u{270D} Задать вопрос", "question"),
        ]),
    });
});

async function run() {
    if (process.env.UPDATES === "webhook") {
        await vk.updates.startWebhook();

        console.log("Webhook server started");
    } else {
        await vk.updates.startPolling();

        console.log("Polling started");
    }
}

run().catch(console.error);