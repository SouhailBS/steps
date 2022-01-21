const db = require("../models");
const User = db.user;
const Role = db.role;

const bcrypt = require("bcryptjs");

exports.create = (req, res) => {
    const user = new User({
        name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        Role.findOne({name: "employee"}, (err, role) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            user.roles = [role._id];
            user.save(err => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                res.json(user);
            });
        });
    });
};
exports.read = async (req, res) => {
    const users = await User.find();
    for (let i = 0; i < users.length; i++) {
        users[i].password = undefined;
    }
    res.status(200).json(users);
};
exports.update = (req, res) => {
    User.findById(req.params.id, async (err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (req.body.name) {
            user.name = req.body.name;
        }
        if (req.body.email) {
            const _user = (await User.findOne({email: req.body.email}))
            if (user.email !== req.body.email && _user) {
                res.status(400).send({message: "Failed! Email '" + req.body.email + "' is already in use!"});
                return;
            }
            user.email = req.body.email;
        }
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        await user.save();
        user.password = undefined;
        res.status(200).json(user);
    });
};
exports.delete = (req, res) => {
    User.findById(req.params.id, async (err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (user.roles.includes((await Role.findOne({name: "admin"}))._id.toHexString())) {
            res.status(200).send("Admin user can't be deleted.");
            return;
        }
        await user.delete();
        res.status(200).send("User deleted.");
    });
};
exports.me = async (req, res) => {
    const user = await User.findById(req.userId);
    user.password = undefined;
    res.status(200).json(user);
};