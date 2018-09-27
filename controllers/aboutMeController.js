const moment = require("moment");
const { BIRTHDAY } = require("config").get("constants");
const { Markup, compileMessage } = require("../helpers");

function getMyAge(birthday) {
    let current = moment(Date.now());
    let age = current.diff(birthday, "years");
    return age;
}

function getMyAgeTemplate(age) {
    let rest = age % 10;
    let stat = "лет";
    if (rest === 1) stat = "год";
    else if ([2, 3, 4].indexOf(rest) !== -1) stat = "года";

    return `${age} ${stat}`;
}

function getKeyboard() {
    return Markup.keyboard([
        [
            Markup.defaultButton("\u{2139} Информация", "aboutme"),
            Markup.defaultButton("\u{2B50} Навыки", "skills"),
        ],
        Markup.positiveButton("\u{1F3E0} В гл.меню", "back"),
    ]);
}

function informationAction(ctx) {
    const message = `Краткая информация.\n
    Имя : Олег
    Возраст : ${getMyAgeTemplate(getMyAge(BIRTHDAY))} 
    Образование : студент, 3-й курс.\n
    Личные качества:
    \u0031\u20E3 аналитический склад ума
    \u0032\u20E3 целеустремленность
    \u0033\u20E3 быстрое усвоение новой информации`;

    const keyboard = getKeyboard();

    return ctx.send({ message: compileMessage(message), keyboard });
}

function skillsAction(ctx) {
    const message = `\u{1F47E}МОИ НАВЫКИ:\n
    \u{1F538} Node.js, Express.js
    \u{1F538} MongoDB, Redis, LevelDB, MYSQL
    \u{1F538} Python, Django
    \u{1F538} Go
    \u{1F538} PHP
    \u{1F538} Angular 1-2
    \u{1F538} React + Redux
    
    \u{1F4F2} https://github.com/oregu7`;

    const keyboard = getKeyboard();

    return ctx.send({ message: compileMessage(message), keyboard });
}

module.exports = {
    informationAction,
    skillsAction,
};