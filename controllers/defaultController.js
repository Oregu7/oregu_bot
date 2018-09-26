const apiai = require("apiai")(process.env.APIAI_TOKEN);

function apiaiRequest(userId, query = "") {
    return new Promise((resolve, reject) => {
        let request = apiai.textRequest(query, {
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
        return ctx.send({ message: "Неизвестная команда" });

    const response = await apiaiRequest(userId, text);
    const message = response.result.fulfillment.speech;

    return ctx.send({ message });
};