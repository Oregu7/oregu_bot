// Skip outbox message and handle errors
module.exports = async(context, next) => {
    if (context.is("message") && context.isOutbox()) {
        return;
    }

    try {
        await next();
    } catch (error) {
        console.error("Error:", error);
    }
};