const { Keyboard } = require("vk-io");
const _createButton = Symbol("createButton");

class Markup {
    static[_createButton](label, command, color) {
        return Keyboard.textButton({
            label,
            payload: {
                command,
            },
            color,
        });
    }

    static keyboard(buttons) {
        if (!Array.isArray(buttons)) new Error("Markup.keyboard [param buttons] is not Array");
        return Keyboard.keyboard(buttons);
    }

    static defaultButton(label, command) {
        return this[_createButton](label, command, Keyboard.DEFAULT_COLOR);
    }

    static primaryButton(label, command) {
        return this[_createButton](label, command, Keyboard.PRIMARY_COLOR);
    }

    static positiveButton(label, command) {
        return this[_createButton](label, command, Keyboard.POSITIVE_COLOR);
    }

    static negativeButton(label, command) {
        return this[_createButton](label, command, Keyboard.NEGATIVE_COLOR);
    }
}

module.exports = Markup;