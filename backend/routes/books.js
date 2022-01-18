const express = require('express');
const router = express.Router();
const {authJwt} = require("../middlewares");
const controller = require("../controllers/book");

router.get(
    "/",
    [
        authJwt.verifyToken,
        authJwt.isEmployee,
    ],
    controller.read
);
router.post(
    "/",
    [
        authJwt.verifyToken,
        authJwt.isEmployee,
    ],
    controller.create
);
router.put(
    "/:id",
    [
        authJwt.verifyToken,
        authJwt.isEmployee,
    ],
    controller.update
);
router.delete(
    "/:id",
    [
        authJwt.verifyToken,
        authJwt.isEmployee,
    ],
    controller.delete
);

module.exports = router;
