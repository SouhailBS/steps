const express = require('express');
const router = express.Router();
const {authJwt} = require("../middlewares");
const controller = require("../controllers/user");
const verifyCreateUser = require("../middlewares/verifyCreateUser");

router.get(
    "/me",
    [
        authJwt.verifyToken,
        authJwt.isEmployee,
    ],
    controller.me
);
router.get(
    "/",
    [
        authJwt.verifyToken,
        authJwt.isAdmin,
    ],
    controller.read
);
router.post(
    "/",
    [
        authJwt.verifyToken,
        authJwt.isAdmin,
        verifyCreateUser.checkDuplicateEmail,
        verifyCreateUser.checkRolesExisted
    ],
    controller.create
);
router.put(
    "/:id",
    [
        authJwt.verifyToken,
        authJwt.isAdmin,
    ],
    controller.update
);
router.delete(
    "/:id",
    [
        authJwt.verifyToken,
        authJwt.isAdmin,
    ],
    controller.delete
);
/*
router.get(
    "/api/employee",
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.employeeBoard
);
*/

module.exports = router;
