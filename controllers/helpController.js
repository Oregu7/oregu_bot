const { compileMessage } = require("../helpers");
//const { UserModel } = require("../models");

module.exports = async(ctx) => {
    //const user = await UserModel.getOrCreate(ctx);

    const message = `Oregu Bot - это бот, который ознакомит Вас с моим портфолио, 
    а также поможет задать мне вопрос.
    
    Используйте эти команды, чтобы управлять ботом:

    /aboutme - информация обо мне
    /works - мои работы
    /question - задать вопрос
    /help - помощь`;

    return await ctx.send({
        message: compileMessage(message),
        //keyboard,
        attachment: "photo-168410376_456239021",
    });
};