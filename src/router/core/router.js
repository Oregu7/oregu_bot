const BaseRouter = require("./base-router");

class Router extends BaseRouter {
    constructor(IDB, vk, routes = []) {
        super(IDB, vk, routes);
        return this.routing.bind(this);
    }
}

module.exports = Router;