const db = require("../models");
const Type = db.type;
const Book = db.book;

exports.create = (req, res) => {
    const type = new Type({
        name: req.body.name
    });
    type.save((err, type) => {
        if (err) {
            res.status(500).json({message: err});
            return;
        }
        res.status(200).json(type);
    });
};
exports.read = async (req, res) => {
    res.status(200).json(await Type.find());
};
exports.update = (req, res) => {
    Type.findById(req.params.id, async (err, type) => {
        if (err) {
            res.status(500).json({message: err});
            return;
        }
        if (req.body.name) {
            type.name = req.body.name;
        }
        await type.save();
        res.status(200).json(type);
    });
};
exports.delete = (req, res) => {
    Type.findById(req.params.id, async (err, type) => {
        if (err) {
            res.status(500).json({message: err});
            return;
        }
        let bookCount = await Book.countDocuments({type: type._id});
        if (bookCount > 0) {
            res.status(400).json({message: "There is " + bookCount + " more books in this type"});
            return;
        }
        await type.delete();
        res.status(200).json(type);
    });
};
