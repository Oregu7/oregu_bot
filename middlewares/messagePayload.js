// Handle message payload
module.exports = async(ctx, next) => {
    if (ctx.is("message")) {
        const payload = ctx.getMessagePayload();

        ctx.state.command = payload && payload.command ?
            payload.command :
            null;
    }

    await next();
};