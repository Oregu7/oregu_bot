const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ProgramSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 150 },
    description: { type: String, required: true },
    attachments: [String],
    sourceLink: { type: String, default: "" },
    exampleLink: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
});
ProgramSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Program", ProgramSchema);