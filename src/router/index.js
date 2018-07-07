const Router = require("./core/router");
const Route = require("./core/route");
const IDBLevel = require("./core/idb-level");


module.exports = {
    Router,
    IDBLevel,
    Route(template, callback, saveStore = false) {
        return new Route(template, callback, saveStore)
    },
    DefaultRoute(callback) {
        return new Route(".*", false, callback);
    },
};