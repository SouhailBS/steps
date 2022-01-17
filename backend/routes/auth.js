const express = require('express');
const router = express.Router();
const controller = require("../controllers/auth");

/*router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, Content-Type, Accept"
    );
    next();
});*/

router.post("/api/auth/signin", controller.signin);

module.exports = router;