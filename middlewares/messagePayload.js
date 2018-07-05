// Handle message payload
module.exports = async(context, next) => {
    if (context.is("message")) {
        const payload = context.getMessagePayload();

        context.state.command = payload && payload.command ?
            payload.command :
            null;
    }

    await next();
};