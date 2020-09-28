const mongoose = require("mongoose");

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true }
);

mongoose.Promise = global.Promise;

module.exports = mongoose;
