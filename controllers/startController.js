module.exports = async(ctx, next) => {
    ctx.state.command = "help";
    await next();
};