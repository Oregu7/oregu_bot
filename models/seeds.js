require("config");
const ProgramModel = require("./program");
const { compileMessage } = require("../helpers");

const programs = [{
    title: "Новостной сайт Opennews",
    description: "Opennews - это открытая и свободная площадка, где пользователи могут разещать свои новости",
    attachments: ["photo-168410376_456239032", "photo-168410376_456239031", "photo-168410376_456239033"],
    exampleLink: "https://opennews.herokuapp.com",
    rank: 3,
    tags: ["nodejs", "express", "mongodb", "bootstrap"],
}, {
    "title": "Среда для разработки тестов",
    "attachments": [
        "photo-168410376_456239155",
        "photo-168410376_456239156",
        "photo-168410376_456239157",
        "photo-168410376_456239158",
        "photo-168410376_456239159",
        "photo-168410376_456239160",
        "photo-168410376_456239161",
        "photo-168410376_456239162",
        "photo-168410376_456239163",
    ],
    "sourceLink": "https://github.com/Oregu7/tests_constructor",
    "exampleLink": "http://sareth.pythonanywhere.com/",
    "description": `Среда для разработки тестов и проведения тестирования. Разрабатывалась преимущественно для студентов высших и средних учебных заведений.
    
    Основные задачи, которые решает приложение: 
    1) разработка и поддержка тестов;
    2) тестирования учащихся;
    3) обработки результатов тестируемых субъектов.`,
    rank: 1,
    tags: ["python", "django", "MySQL", "AngularJS"],
}, {
    "title": "Система анонимного анкетирования студентов",
    "attachments": [
        "photo-168410376_456239153",
        "photo-168410376_456239149",
        "photo-168410376_456239151",
    ],
    "sourceLink": "",
    "exampleLink": "",
    "description": `Система для проведения анонимного анкетирования студентов и их родителей.
    
    Основные задачи, которые решает приложение:
    1) разработка и поддержка анонимных анкет;
    2) анкетирование учащихся и их родителей;
    3) обработки результатов.`,
    rank: 5,
    tags: ["python", "django", "MySQL", "AngularJS"],
}, {
    "title": "Игровой VK Бот на аниме текматику",
    "attachments": [
        "photo-168410376_456239027",
        "photo-168410376_456239028",
        "photo-168410376_456239029",
        "photo-168410376_456239030",
    ],
    "sourceLink": "",
    "exampleLink": "https://vk.me/anidojo",
    "description": "Многофункциональный аниме бот для VK",
    rank: 2,
    tags: ["nodejs", "VkontakteApi", "mongodb"],
}, {
    "title": "Приложение для составления расписания в учебных заведениях",
    "attachments": [
        "photo-168410376_456239166",
        "photo-168410376_456239167",
        "photo-168410376_456239165",
    ],
    "sourceLink": "",
    "exampleLink": "",
    "description": `Разрабатывалась преимущественно для преподавателей высших и средних учебных заведений.
    
    Основные задачи, которые решает приложение: 
    1) составление расписания;
    2) контроль часов и предметов;
    3) формирование расписания в различных форматах(для удобства печати).`,
    rank: 4,
    tags: ["python", "django", "MySQL", "AngularJS"],
}];

ProgramModel.create(programs.map((program) => {
    program.description = compileMessage(program.description);
    return program;
})).then(console.log);