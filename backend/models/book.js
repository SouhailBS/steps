const mongoose = require("mongoose");

const Book = mongoose.model(
    "Book",
    new mongoose.Schema({
        title: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author"
        },
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Type"
        },
        published_at: Date
    })
);

module.exports = Book;