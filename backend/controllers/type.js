const db = require("../models");
const Type = db.type;

exports.create = (req, res) => {
    const type = new Type({
        name: req.body.name
    });
    type.save((err, type) => {
        if (err) {
            res.status(500).send({message: err});
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
            res.status(500).send({message: err});
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
            res.status(500).send({message: err});
            return;
        }

        await type.delete();
        res.status(200).json(type);
    });
};
