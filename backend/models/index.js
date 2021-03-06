const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./role");
db.type = require("./type");
db.author = require("./author");
db.book = require("./book");

module.exports = db;