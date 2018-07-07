function clearState(idb) {
    return async(id, level = 0) => {
        await idb.save(id, { state: [] });
        return true;
    };
}

function getData(idb) {
    return async(id) => {
        return await idb.get(id);
    };
}

function saveData(idb) {
    return async(id, val) => {
        return await idb.save(id, val);
    };
}

function deleteData(idb) {
    return async(id, property) => {
        let data = await idb.get(id);
        if (data.hasOwnProperty(property)) {
            delete data[property];
            return await idb.put(id, data);
        }
        return false;
    };
}

module.exports = {
    clearState,
    getData,
    saveData,
    deleteData,
};