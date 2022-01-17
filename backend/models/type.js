const mongoose = require("mongoose");

const Type = mongoose.model(
    "Type",
    new mongoose.Schema({
        name: String,
    })
);

module.exports = Type;