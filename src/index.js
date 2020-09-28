require("dotenv/config");

const express = require("express");
const bosyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

app.use(bosyParser.json());
app.use(bosyParser.urlencoded({ extended: false }));

app.use("/img", express.static(path.join(__dirname, "assets", "images")));
app.use("/file", require("./controllers/files"));

app.listen(process.env.PORT);
