const apiai = require("apiai")(process.env.APIAI_TOKEN);
const { choice } = require("../helpers");
const stickers = require("config").get("stickers");

function apiaiRequest(userId, query = "") {
    return new Promise((resolve, reject) => {
        const request = apiai.textRequest(query, {
            sessionId: userId,
        });

        request.on("response", resolve);
        request.on("error", reject);
        request.end();
    });
}

module.exports = async(ctx) => {
    const { peerId: userId, text } = ctx;
    if (!text)
        return ctx.send({ sticker_id: choice(stickers) });

    try {
        const response = await apiaiRequest(userId, text);
        const message = response.result.fulfillment.speech;
        return ctx.send({ message });
    } catch (err) {
        console.error(err);

        return ctx.send({ message: "Неизвестная команда !", title: "Ошибка" });
    }

};