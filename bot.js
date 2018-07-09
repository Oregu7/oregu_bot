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
} = require("./controllers");

const vk = new VK();

vk.setOptions({
    token: process.env.BOT_TOKEN,
    apiMode: "parallel_selected",
    webhookPath: "/webhook/secret-path",
});

const { updates } = vk;

// Skip outbox message and handle errors
updates.use(middlewares.outboxMessageAndErrors);
// Handle message payload
updates.use(middlewares.messagePayload);

const router = new Router(new IDBLevel("state.db"), vk, [
    Route(["^/start$", "^Начать$"], startController),
    Route(["^/aboutme$", "\u{1F464} Обо мне", "\u{2139} Информация"], aboutMeController.informationAction),
    Route(["^/skills$", "\u{2B50} Навыки"], aboutMeController.skillsAction),
    Route(["^/(back|cancel)$", "\u{1F3E0} В гл.меню"], backToMainController),
    Route(["^/help$", "помощь"], helpController),
    Route(["^/question$", "\u{270D} Задать вопрос"], true, [
        Route("^/$", questionController.baseAction),
        Route(["^/cancel$", "^отмена$"], questionController.cancelAction),
        DefaultRoute(questionController.questionAction),
    ]),
    Route(["^/works$", "\u{1F5A5} Работы"], worksController.baseAction),
    Route("^/page (\\d+)$", worksController.pageAction),
]);

updates.on("message", router);

module.exports = vk;