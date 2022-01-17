const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./role");
db.type = require("./type");

db.ROLES = ["employee", "admin"];

module.exports = db;