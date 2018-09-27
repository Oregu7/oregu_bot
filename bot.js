const { VK } = require("vk-io");

const middlewares = require("./middlewares");
const { Route, IDBLevel, Router, DefaultRoute } = require("./src/router");
const {
    startController,
    helpController,
    worksController,
    aboutMeController,
    questionController,
    backToMainController,
    defaultController,
} = require("./controllers");

const vk = new VK();
vk.setOptions({
    token: process.env.BOT_TOKEN,
    apiMode: "parallel_selected",
    webhookPath: process.env.BOT_WEBHOOK,
    webhookSecret: process.env.BOT_SECRET,
    webhookConfirmation: process.env.BOT_CONFIRMATION,
});

const { updates } = vk;

// Skip outbox message and handle errors
updates.use(middlewares.outboxMessageAndErrors);
// Handle message payload
updates.use(middlewares.messagePayload);

const router = new Router(new IDBLevel("state.db"), vk, [
    Route(["^/start$", "^Начать$", "^Команды$"], startController),
    Route(["^/aboutme$", "Обо мне", "Информация"], aboutMeController.informationAction),
    Route(["^/skills$", "Навыки"], aboutMeController.skillsAction),
    Route(["^/(back|cancel)$", "В гл.меню"], backToMainController),
    Route(["^/help$", "помощь"], startController),
    Route(["^/question$", "Задать вопрос"], true, [
        Route("^/$", questionController.baseAction),
        Route(["^/cancel$", "^отмена$"], questionController.cancelAction),
        DefaultRoute(questionController.questionAction),
    ]),
    Route(["^/works$", "Работы"], worksController.baseAction),
    Route("^/page (\\d+)$", worksController.pageAction),
    DefaultRoute(defaultController),
]);

updates.on("message", router);

module.exports = vk;