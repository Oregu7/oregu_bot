module.exports = (updates) => (name, conditions, handle) => {
    if (typeof handle !== "function") {
        handle = conditions;
        conditions = [`/${name}`];
    }

    if (!Array.isArray(conditions)) {
        conditions = [conditions];
    }

    updates.hear(
        [
            (text, { state }) => (
                state.command === name
            ),
            ...conditions,
        ],
        handle
    );
};