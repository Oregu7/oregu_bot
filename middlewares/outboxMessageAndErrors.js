// Skip outbox message and handle errors
module.exports = async(ctx, next) => {
    if (ctx.is("message") && ctx.isOutbox()) {
        return;
    }

    try {
        await next();
    } catch (error) {
        console.error("Error:", error);
    }
};