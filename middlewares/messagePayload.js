// Handle message payload
module.exports = async(ctx, next) => {
    if (ctx.is("message")) {
        const { messagePayload: payload } = ctx;

        ctx.text = payload && payload.command ?
            "/" + payload.command :
            ctx.text;
    }

    await next();
};