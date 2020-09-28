const mongoose = require("../database");

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const File = mongoose.model("File", FileSchema);
module.exports = File;
