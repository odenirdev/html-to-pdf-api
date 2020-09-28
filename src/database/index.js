const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://html-to-pdf-user:63Dz2hkOexRcU8NK@cluster0.fkhp6.mongodb.net/html-to-pdf-api?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
);

mongoose.Promise = global.Promise;

module.exports = mongoose;
