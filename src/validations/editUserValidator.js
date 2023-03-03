const { check, body, validationResult } = require("express-validator");

module.exports = [
    check("nombreYApellido").trim()
        .notEmpty()
        .withMessage("User cannot be empty")
        .isString()
        .withMessage("The type must be string")
        .isLength({ min: 5 })
        .withMessage("Minimum 5 characters"),

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
            if (value < 2147483647 && value > -2147483647) {
                return true;
            }
            throw new Error("The phone is not valid");
        }),
];