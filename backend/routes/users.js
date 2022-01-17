const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user");

/*router.use(function(req, res, next) {
  res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
  );
  next();
});*/

router.get(
    "/api/employee",
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.employeeBoard
);

router.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
);
module.exports = router;
