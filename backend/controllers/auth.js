const config = require("../config/auth");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
    if (!req.body.email) {
        return res.status(400).send({message: "Bad request."});
    }
    User.findOne({
        email: req.body.email
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            if (!user) {
                return res.status(401).send({message: "Invalid credentials!"});
            }
            if (!req.body.password) {
                return res.status(400).send({message: "Bad request."});
            }
            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid credentials!"
                });
            }

            const token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            const authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
};