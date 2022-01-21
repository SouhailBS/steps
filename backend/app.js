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
let apiRouter = require('./routes/api');
require("dotenv").config();
let app = express();
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

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

db.mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log("Successfully connect to MongoDB.");
        await initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

async function initial() {
    if ((await Role.countDocuments()) === 0) {
        await new Role({
            name: "employee"
        }).save();
        console.log("added 'employee' to roles collection");

        await new Role({
            name: "admin"
        }).save();
        console.log("added 'admin' to roles collection");
    }

    if ((await User.countDocuments()) === 0) {
        await new User({
            name: process.env.USER_NAME,
            email: process.env.USER_EMAIL,
            password: bcrypt.hashSync(process.env.USER_PASSWORD, 8),
            roles:
                await Role.find().distinct("_id")

        }).save();
        console.log("added " + process.env.USER_EMAIL + " as admin user collection");
    }
}

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api', apiRouter);

module.exports = app;
