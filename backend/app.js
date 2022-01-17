let express = require('express');
let path = require('path');
let logger = require('morgan');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Import CORS
let cors = require("cors");
// Import bcrypt
let bcrypt = require("bcryptjs");
let indexRouter = require('./routes/index');
let authRouter = require('./routes/auth');
let usersRouter = require('./routes/users');
let typesRouter = require('./routes/types');
let authorsRouter = require('./routes/authors');
process.env.PORT = 4000;
let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
let corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
const db = require("./models");
const dbConfig = require("./config/db");
const Role = db.role;
const User = db.user;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "employee"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'employee' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
    User.estimatedDocumentCount(async (err, count) => {
        if (!err && count === 0) {
            await new User({
                name: "Souhail BEN SLIMENE",
                email: "souhail.b.slimene@gmail.com",
                password: bcrypt.hashSync('admin', 8),
                roles:
                    await Role.find().distinct("_id")

            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to users collection");
            });
        }
    });
}

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/types', typesRouter);
app.use('/api/authors', authorsRouter);

module.exports = app;
