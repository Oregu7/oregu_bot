const level = require("level");

class IDBLevel {
    //мы можем передать путь или саму базу
    constructor(db) {
        if (typeof(db) === "string") {
            this.db = level(db, {
                valueEncoding: "json",
            });
        } else {
            this.db = db;
        }
    }

    async get(key) {
        try {
            const value = await this.db.get(key);
            if (typeof(value) === "object" && !Array.isArray(value) && !value.hasOwnProperty("state")) {
                return Object.assign({}, value, { state: [] });
            } else if (typeof(value) !== "object" || Array.isArray(value)) {
                return { state: [] };
            } else {
                return value;
            }
        } catch (err) {
            return { state: [] };
        }
    }

    put(key, value) {
        return new Promise((resolve, reject) => {
            this.db.put(key, value, (err) => {
                if (err) reject(err);
                else resolve(`user#${key} data is saved!`);
            });
        });
    }

    async save(key, value) {
        let previous = await this.get(key);
        let data = Object.assign({}, previous, value);
        return await this.put(key, data);
    }

    del(key) {
        return new Promise((resolve, reject) => {
            this.db.del(key, (err) => {
                if (err) reject(err);
                else resolve(`user#${key} data is deleted!`);
            });
        });
    }
}

module.exports = IDBLevel;