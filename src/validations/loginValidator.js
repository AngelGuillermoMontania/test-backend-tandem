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

    body("custom")
        .custom(async (value, { req }) => {
            try {
                let isValid = false
                const pool = await getConnection()
                const result = await pool.request()
                    .input("usuario", sql.NVarChar, req.body.usuario)
                    .query("SELECT * FROM USUARIOS WHERE usuario = @usuario")

                // forEach and the select * since the "user" field is not unique. It may not be the first one you find
                // I would consider applying constraint unique in the user field or login with email, to avoid this behavior and future problems.
                result.recordset.forEach(user => {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        isValid = true
                    }
                });
                if (!isValid) {
                    return Promise.reject("User and password do not match")
                }
            } catch (error) {
                return Promise.reject("Internal Server error")
            }
        }),
];