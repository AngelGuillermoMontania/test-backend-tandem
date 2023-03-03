const { check, body, validationResult } = require("express-validator");

module.exports = [
    check("usuario").trim()
        .notEmpty()
        .withMessage("User cannot be empty")
        .isString()
        .withMessage("The type must be string")
        .isLength({ min: 2 })
        .withMessage("Minimum 2 characters"),

    check("password").trim()
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isString()
        .withMessage("The type must be string")
        .isLength({ min: 2 })
        .withMessage("Minimum 2 characters"),
];