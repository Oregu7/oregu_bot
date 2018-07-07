const memoryStorage = new Map();

module.exports = async(ctx, next) => {
    const { peerId } = ctx;

    const session = memoryStorage.has(peerId) ?
        memoryStorage.get(peerId) : {};

    ctx.state.session = session;

    await next();

    memoryStorage.set(peerId, session);
};