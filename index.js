const config = require("config");
const vk = require("./bot");

async function run() {
    if (config.get("env") === "development") {
        await vk.updates.startPolling();
        console.log("Polling started");
    } else {
        await vk.updates.startWebhook();
        console.log("Webhook server started");
    }
}

run().catch(console.error);