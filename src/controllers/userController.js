const { getConnection, sql } = require("../database/connection");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

module.exports = {
    userLogin: async (req, res) => {

        const errors = validationResult(req);  // I am requesting express-validator errors

        if (errors.isEmpty()) {   //isEmpty() will return a boolean if errors are empty
            try {
                let isValid = false
                const pool = await getConnection()
                const result = await pool.request()
                    .input("usuario", sql.NVarChar, req.body.usuario)
                    .query("SELECT * FROM USUARIOS WHERE usuario = @usuario")

                // forEach and the select * since the "user" field is not unique. It may not be the first one you find
                // I would consider applying constraint unique in the user field or login with email, to avoid this behavior and future problems.
                result.recordset.forEach(user => {
                    if (req.body.password === user.password) {
                        isValid = true
                        const token = jwt.sign({
                            id: user.id,
                            usuario: user.usuario
                        }, process.env.JWT_SECRET, { expiresIn: "24h" })
                        res.status(200).json({
                            token
                        })
                    }
                });
                if (!isValid) {
                    res.status(400).send("User and password do not match")
                }
            } catch (error) {
                res.status(500).send(error.message)
            }
        } else {
            res.status(400).json({
                errors: { ...errors.mapped() } // Send errors
            })
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const pool = await getConnection()
            const result = await pool.request().query("SELECT * FROM USUARIOS")
            result.recordset.shift()  // Do not send admin user
            res.status(200).json(result.recordset)
        } catch (error) {
            res.status(500).send(error.message || error)
        }
    },
    createUser: async (req, res) => {
        const { nombreYApellido, usuario, password, email, telefono, dni } = req.body
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            try {
                const pool = await getConnection()
                const result = await pool.request()
                    .input("nombreYApellido", sql.NVarChar, nombreYApellido)
                    .input("usuario", sql.NVarChar, usuario)
                    .input("password", sql.NVarChar, password)  
                    /* I would recommend for security reasons to save the password with the use of bcrypt or similar. 
                    In this case I have to show the password on the front end, which prevents its use. */
                    .input("email", sql.NVarChar, email)
                    .input("telefono", sql.Int, telefono)
                    .input("dni", sql.Int, dni)
                    .query("INSERT INTO USUARIOS (nombreYApellido, usuario, password, email, telefono, dni) VALUES (@nombreYApellido, @usuario, @password, @email, @telefono, @dni)")
                res.status(201).json({ ...req.body })
            } catch (error) {
                res.status(500).send(error.message || error)
            }
        } else {
            res.status(400).json({
                errors: { ...errors.mapped() }
            })
        }
    },
    getOneUser: async (req, res) => {

        const { id } = req.params

        try {
            const pool = await getConnection()
            const result = await pool.request()
            .input("id", id)
            .query("SELECT * FROM USUARIOS WHERE id = @id")
            if(result.recordset[0] === undefined) {
                res.status(400).send(`The resource could not be edited. Check the user id ${id}`)
            } else {
                res.status(200).json(result.recordset[0])
            }
        } catch (error) {
            res.status(500).send(error.message || error)
        }
    },
    editUser: async (req, res) => {

        const { nombreYApellido, usuario, password, email, telefono } = req.body
        const errors = validationResult(req);
        const { id } = req.params

        if (errors.isEmpty()) {
            try {
                const pool = await getConnection()
                const result = await pool.request()
                    .input("id", id)
                    .input("nombreYApellido", sql.NVarChar, nombreYApellido)
                    .input("usuario", sql.NVarChar, usuario)
                    .input("password", sql.NVarChar, password)
                    .input("email", sql.NVarChar, email)
                    .input("telefono", sql.Int, telefono)
                    .query("UPDATE USUARIOS SET nombreYApellido = @nombreYApellido, usuario = @usuario, password = @password, email = @email, telefono = @telefono, fechaModificacion = getDate() WHERE id = @id")
                if (result.rowsAffected[0] !== 0) {
                    res.status(201).json({ ...req.body })
                } else {
                    res.status(400).send(`The resource could not be edited. Check the user id ${id}`)
                }
            } catch (error) {
                res.status(500).send(error.message || error)
            }
        } else {
            res.status(400).json({
                errors: { ...errors.mapped() }
            })
        }
    },
    deleteUser: async (req, res) => {

        const { id } = req.params

        try {
            const pool = await getConnection()
            const result = await pool.request()
                .input("id", id)
                .query("DELETE FROM USUARIOS WHERE id = @id")
            if (result.rowsAffected[0] !== 0) {
                res.status(204).send()
            } else {
                res.status(400).send(`The resource could not be deleted. Check the user id ${id}`)
            }
        } catch (error) {
            res.status(500).send(error.message || error)
        }
    },
}