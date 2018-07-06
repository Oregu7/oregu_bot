const Markup = require("./markup");

module.exports = () => Markup.keyboard([
    [
        Markup.defaultButton("\u{1F464} Обо мне", "aboutme"),
        Markup.defaultButton("\u{1F5A5} Работы", "works"),
    ],
    Markup.primaryButton("\u{270D} Задать вопрос", "question"),
]);