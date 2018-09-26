const { Markup, compileMessage } = require("../helpers");
const { ProgramModel } = require("../models");

// helpers
async function sendProgramByPageNumber(ctx, page = 1) {
    const result = await ProgramModel.paginate({}, {
        page,
        limit: 1,
        sort: "rank",
    });

    const message = createProgramMessage(result);
    return ctx.send(message);
}

function getKeyboard(next, previous) {
    return Markup.keyboard([
        [
            Markup.defaultButton("\u{2B05} Назад", `page ${previous}`),
            Markup.defaultButton("Дальше \u{27A1}", `page ${next}`),
        ],
        Markup.positiveButton("\u{1F3E0} В гл.меню", "cancel"),
    ]);
}

function paginate({ page, pages } = {}) {
    let next = page + 1;
    let previous = page - 1;

    if (next > pages) next = 1;
    if (previous <= 0) previous = pages;

    return {
        next,
        previous,
    };
}

function createProgramMessage(result) {
    const [program] = result.docs;

    const {
        title,
        description,
        attachments,
        sourceLink,
        exampleLink,
        tags,
    } = program;

    const message = `${title}\n
    ${description}
    
    ${tags.map((tag) => "#"+tag).join(" ")}`;

    const attachment = attachments.join(",");
    const { next, previous } = paginate(result);
    const keyboard = getKeyboard(next, previous);

    return {
        message: compileMessage(message),
        attachment,
        keyboard,
    };
}

// Controller Actions 
function baseAction(ctx) {
    return sendProgramByPageNumber(ctx);
}

function pageAction(ctx) {
    const regx = /^\/page (\d+)$/;
    const [, page] = ctx.text.match(regx);

    return sendProgramByPageNumber(ctx, Number(page));
}

module.exports = {
    baseAction,
    pageAction,
};