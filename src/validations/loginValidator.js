const { check, body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { getConnection, sql } = require("../database/connection")

module.exports = [
    check("usuario").trim()
        .notEmpty()
        .withMessage("User cannot be empty")
        .isString()
        .withMessage("The type must be string"),

    check("password").trim()
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isString()
        .withMessage("The type must be string"),
];