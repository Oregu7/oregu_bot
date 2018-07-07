const _ = require("lodash");

class BaseRouter {
    constructor(IDB, vk, routes = [], level = 0) {
        this.idb = IDB;
        this.vk = vk;
        this.level = level;
        this.routes = routes;
        this.initializeSubRouters();
    }

    routing(ctx, next, state = false) {
        const { text, peerId } = ctx;
        const run = this.run.bind(this, ctx);
        this.search(peerId, text, state).then(run);
    }

    //поиск совпадений
    async search(peerId, text, state = false) {
        //если state не был передан, то достаем его из хранилища, иначе сразу вызываем callback
        if (!state) state = (await this.idb.get(peerId)).state;
        //достаем индекс из состояния в зависимости от уровня вложенности роутера(level)
        let [indxRoute] = state.slice(this.level, this.level + 1);
        //проверям существования индекса и роута, который ему соответствует
        if (indxRoute && this.routes[indxRoute]) {
            return { indxRoute, state };
        } else {
            //ищем совпадения
            indxRoute = _.findIndex(this.routes, (route) => { return route.compare(text); });
            return { indxRoute, state, firstCall: true };
        }

    }

    async run(ctx, { indxRoute, state, firstCall = false }) {
        const { peerId } = ctx;
        ctx._idb = this.idb;
        //совпадения не были найдены, вызываем defaultRouter или does404(если defaultRouter не определен)
        if (indxRoute == -1) {
            this.does404(ctx);
        } else {
            const route = this.routes[indxRoute];
            //сохранение состояния
            if (route.saveState) {
                //получаем индекс старого состояния, если оно не совпадает с новым, сейвим
                const [oldIndxRoute] = state.slice(this.level, this.level + 1);
                if (indxRoute != oldIndxRoute) {
                    state.splice(this.level, 1, indxRoute);
                    let ok = await this.idb.save(peerId, { state });
                }
            }
            //проверяем обычный route или sub-router
            route.start(ctx, state, firstCall);
        }
    }

    //инициализируем sub роуты
    initializeSubRouters() {
        this.routes = this.routes.map((route) => {
            if (route.subRouter) {
                let routes = route.routes;
                let subRoute = new BaseRouter(this.idb, this.vk, routes, this.level + 1);
                route.initializeSubRouter(subRoute);
            }
            return route;
        });
    }

    //совпадения не найдены и DefaultRoute не определен
    does404(ctx) {
        const message = "Неизвестная команда!";
        const title = "Ошибка!";
        ctx.send({ message, title });
    }
}

module.exports = BaseRouter;