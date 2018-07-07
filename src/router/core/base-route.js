const _ = require("lodash");

class BaseRoute {
    constructor(patterns) {
        if (!(_.isArray(patterns) || _.isString(patterns))) throw new Error("Route:patterns is unknown type. I was supported is [ array and string ] types");
        this.pattern = this.transformToRegExp(patterns);
    }

    //ищем совпадение с сообщением в (элементах массива или строке)
    compare(str) {
        return this.pattern.test(str);
    }

    //трансформируем паттерны в RegExp
    transformToRegExp(patterns) {
        return Array.isArray(patterns) ?
            this.compilePatternFromArray(patterns) :
            this.createRegExp(patterns);
    }

    //компилируем паттерн из массива (разделяем его элементы - "|" и получившуюся строку преобразуем в RegExp)
    compilePatternFromArray(patterns) {
        return this.createRegExp(patterns.join("|"));
    }

    //создаем новый экземпляр RegExp
    createRegExp(pattern) {
        return new RegExp(pattern, "iu");
    }
}

module.exports = BaseRoute;