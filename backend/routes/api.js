const express = require('express');
const router = express.Router();
const {authJwt} = require("../middlewares");
const verifyCreateUser = require("../middlewares/verifyCreateUser");
const author = require("../controllers/author");
const book = require("../controllers/book");
const type = require("../controllers/type");
const user = require("../controllers/user");

router.route("/users/me")
    .get([
            authJwt.verifyToken,
            authJwt.isEmployee,
        ],
        user.me
    );
router.route("/users")
    .get([
            authJwt.verifyToken,
            authJwt.isAdmin,
        ],
        user.read
    ).post([
        authJwt.verifyToken,
        authJwt.isAdmin,
        verifyCreateUser.checkDuplicateEmail,
        verifyCreateUser.checkRolesExisted
    ],
    user.create
);
router.route("/users")
    .put([
            authJwt.verifyToken,
            authJwt.isAdmin,
        ],
        user.update
    ).delete([
        authJwt.verifyToken,
        authJwt.isAdmin,
    ],
    user.delete
);

// Authors CRUD
router.route("/authors")
    .get([
            authJwt.verifyToken,
            authJwt.isEmployee,
        ],
        author.read
    ).post([
        authJwt.verifyToken,
        authJwt.isEmployee,
    ],
    author.create
);
router.route("/authors/:id")
    .put([
            authJwt.verifyToken,
            authJwt.isEmployee,
        ],
        author.update
    ).delete([
        authJwt.verifyToken,
        authJwt.isEmployee,
    ],
    author.delete
);

// Type CRUD
router.route("/types")
    .get([
            authJwt.verifyToken,
            authJwt.isEmployee,
        ],
        type.read
    ).post([
        authJwt.verifyToken,
        authJwt.isEmployee,
    ],
    type.create
);
router.route("/types/:id")
    .put([
            authJwt.verifyToken,
            authJwt.isEmployee,
        ],
        type.update
    ).delete([
        authJwt.verifyToken,
        authJwt.isEmployee,
    ],
    type.delete
);

// Books CRUD
router.route("/books")
    .get([
            authJwt.verifyToken,
            authJwt.isEmployee,
        ],
        book.read
    ).post([
        authJwt.verifyToken,
        authJwt.isEmployee,
    ],
    book.create
);
router.route("/books/:id")
    .put([
            authJwt.verifyToken,
            authJwt.isEmployee,
        ],
        book.update
    ).delete([
        authJwt.verifyToken,
        authJwt.isEmployee,
    ],
    book.delete
);

module.exports = router;
