const db = require("../models");
const Author = db.author;

exports.create = (req, res) => {
    const author = new Author({
        name: req.body.name
    });
    author.save((err, author) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).json(author);
    });
};
exports.read = async (req, res) => {
    res.status(200).json(await Author.find());
};
exports.update = (req, res) => {
    if (req.body.name) {
        Author.findByIdAndUpdate(req.params.id, {name: req.body.name}, async (err, author) => {
            if (err) {
                res.status(500).json({message: err});
                return;
            }
            res.status(200).json(await Author.findById(req.params.id));
        });
    }
};
exports.delete = (req, res) => {
    Author.findById(req.params.id, async (err, author) => {
        if (err) {
            res.status(500).json({message: err});
            return;
        }

        await author.delete();
        res.status(200).json(author);
    });
};
