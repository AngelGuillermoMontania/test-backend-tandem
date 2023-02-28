const { check, body, validationResult } = require("express-validator");
const { getConnection, sql } = require("../database/connection")
const bcrypt = require("bcrypt");

module.exports = [
    check("nombreYApellido").trim()
        .notEmpty()
        .withMessage("User cannot be empty")
        .isString()
        .withMessage("The type must be string"),

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

    check("email").trim()
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isString()
        .withMessage("The type must be string")
        .isEmail()
        .withMessage("Not a valid email"),

    check("telefono")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isNumeric()
        .withMessage("The type must be number")
        .custom((value, { req }) => {
            console.log(req.body.telefono)
            if (value < 2147483647 && value > -2147483647) {
                return true;
            }
            throw new Error("The phone is not valid");
        }),

    check("dni")
        .notEmpty()
        .withMessage("DNI cannot be empty")
        .isNumeric()
        .withMessage("The type must be number")
        .custom((value, { req }) => {
            console.log(req.body.telefono)
            if (value < 100000000 && value > 5000000) {
                return true;
            }
            throw new Error("The DNI is not valid");
        }),
];