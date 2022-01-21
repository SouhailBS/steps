const db = require("../models");
const Book = db.book;
const Author = db.author;
const Type = db.type;

exports.create = async (req, res) => {
    if (!(await Author.exists({_id: req.body.author}))) {
        res.status(400).send("Author not found.");
        return;
    }
    if (!(await Type.exists({_id: req.body.type}))) {
        res.status(400).send("Type not found.");
        return;
    }

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        type: req.body.type,
        published_at: Date.parse(req.body.published_at)
    });

    book.save(async (err, book) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).json(await book.populate(['author', 'type']));
    });
};
exports.read = async (req, res) => {
    res.status(200).json(await Book.find().populate(['author', 'type']));
};
exports.update = (req, res) => {
    Book.findById(req.params.id, async (err, book) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (req.body.title) {
            book.name = req.body.title;
        }if (req.body.published_at) {
            book.name = Date.parse(req.body.published_at);
        }
        if (req.body.author) {
            if (!(await Author.exists({_id: req.body.author}))) {
                res.status(400).send("Author not found.");
                return;
            }
            book.author = req.body.author;
        }
        if (req.body.type) {
            if (!(await Type.exists({_id: req.body.type}))) {
                res.status(400).send("Type not found.");
                return;
            }
            book.type = req.body.type;
        }
        await book.save();
        res.status(200).json(book);
    });
};
exports.delete = (req, res) => {
    Book.findById(req.params.id, async (err, book) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        await book.delete();
        res.status(200).json(book);
    });
};
