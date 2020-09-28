const express = require("express");
const router = express.Router();
const pdf = require("html-pdf");
const ejs = require("ejs");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const File = require("../models/file");

const createFile = async (name, url) => {
    try {
        return await File.create({
            name,
            url,
        });
    } catch (error) {
        response.status(400).json({ message: "Convert file fail", error });
        return;
    }
};

router.post("/convert", async (request, response) => {
    const { html, name } = request.body;

    if (!name) {
        response.status(400).json({ message: "name is required" });
    }

    if (!html) {
        response.status(400).json({ message: "html is required" });
    }

    const token = crypto.randomBytes(16).toString("hex");

    const serializedName = `${name}.pdf`;

    const filename = `${token}-${serializedName}`;

    let date = new Date();

    date = `${date.getDate()}/${
        date.getMonth() + 1
    }/${date.getFullYear()} ${date.toLocaleTimeString()}`;

    ejs.renderFile(
        path.resolve(__dirname, "..", "templates", "index.ejs"),
        { children: html, date },
        (error, html) => {
            if (error) {
                response
                    .status(400)
                    .json({ message: "Convert file fail", error });
                return;
            }

            const options = {
                format: "A4",
                border: {
                    top: "0.7in",
                    right: "0.5in",
                    bottom: "0.7in",
                    left: "0.5in",
                },
            };

            pdf.create(html, options).toFile(
                `./files/${filename}`,
                async (error, res) => {
                    if (error) {
                        response
                            .status(400)
                            .json({ message: "Convert file fail", error });
                        return;
                    }

                    const file = await createFile(serializedName, res.filename);

                    return response.status(200).json(file);
                }
            );
        }
    );
});

router.get("/", async (req, res) => {
    try {
        const response = await File.find({});

        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).send({
            message: "Get all files fail",
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const image = await File.findById(id);

        return res.sendFile(image.url);
    } catch (error) {
        return res.status(400).send({
            message: "Get file fail",
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const image = await File.findById(id);

        fs.unlink(image.url, (error) => {
            if (error) {
                return res.status(400).send({
                    message: "Delete file fail",
                });
            }
        });

        await File.findByIdAndDelete(id);

        return res.status(200).send();
    } catch (error) {
        return res.status(400).send({
            message: "Delete file fail",
        });
    }
});

module.exports = router;
