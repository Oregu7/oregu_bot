const _ = require("lodash");
const BaseRoute = require("./base-route");
const { clearState, getData, saveData, deleteData } = require("./route-options");

let _saveState = new WeakMap();
let _subRouter = new WeakMap();
let _callback = new WeakMap();
let _checkCallback = Symbol("checkCallback");
let _isSubRouter = Symbol("isSubRouter");
let _run = Symbol("run");
let _routing = Symbol("routing");

class Route extends BaseRoute {
    constructor(patterns, saveState = false, callback) {
        super(patterns);
        if (!_.isBoolean(saveState)) {
            callback = saveState;
            saveState = false;
        }
        _callback.set(this, callback);
        _saveState.set(this, saveState);
        _subRouter.set(this, false);
        this[_checkCallback]();
    }

    start(ctx, state = false, firstCall = false) {
        if (!this.subRouter) {
            this[_run](ctx);
        } else if (this.subRouter && this[_isSubRouter]()) {
            this[_routing](ctx, state, firstCall);
        } else {
            throw new Error("your need initialized subRouter");
        }
    }

    [_run](ctx) {
        const { _idb: idb, peerId } = ctx;

        ctx._clearState = clearState(idb).bind(null, peerId);
        ctx._getData = getData(idb).bind(null, peerId);
        ctx._deleteData = deleteData(idb).bind(null, peerId);
        ctx._saveData = saveData(idb).bind(null, peerId);
        ctx._compare = this.compare.bind(this);

        return _callback.get(this)(ctx);
    }

    [_routing](ctx, state = false, firstCall) {
        if (firstCall) ctx.text = "/";
        let subRouter = _callback.get(this);
        subRouter.routing(ctx, state);
    }

    initializeSubRouter(subRouter) {
        if (this.subRouter && !this[_isSubRouter]()) {
            _callback.set(this, subRouter);
        }
    }

    get routes() {
        if (this.subRouter && !this[_isSubRouter]()) {
            return _callback.get(this);
        }
        return null;
    }

    get saveState() {
        return _saveState.get(this);
    }

    get subRouter() {
        return _subRouter.get(this);
    }

    [_checkCallback]() {
        if (Array.isArray(_callback.get(this))) {
            _subRouter.set(this, true);
        } else if (!_.isFunction(_callback.get(this))) {
            throw new Error(`Route:callback is not supported this type => [${typeof(_callback.get(this))}]. Your can use "function" or "array[Route]"`);
        }
    }

    [_isSubRouter]() {
        let callback = _callback.get(this);
        if (!Array.isArray(callback) && typeof(callback) === "object") {
            return true;
        } else {
            return false;
        }
    }

}

module.exports = Route;