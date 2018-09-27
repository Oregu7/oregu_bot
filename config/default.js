// загружаем переменные окружения
require("dotenv").config();
// загружаем компоненты
const constants = require("./constants");
const stickers = require("./stickers");
const mongo = require("./mongo");
// необходимые переменные окружения
const REQUIRED_VARIABLES = [
    "NODE_ENV",
    "PORT",
    "BOT_TOKEN",
    "BOT_CONFIRMATION",
    "DB_URI",
    "ADMIN_ID",
];

REQUIRED_VARIABLES.forEach((name) => {
    if (!process.env[name]) {
        throw new Error(`Environment variable ${name} is missing`);
    }
});

// use mongoDB
mongo(process.env.DB_URI);

// шарим конфиг
module.exports = {
    constants,
    stickers,
    env: process.env.NODE_ENV,
    bot: {
        port: Number(process.env.PORT),
        token: process.env.BOT_TOKEN,
        confirmation: process.env.BOT_CONFIRMATION,
        adminId: process.env.ADMIN_ID,
    },
};