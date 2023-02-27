const { getConnection, sql } = require("../database/connection")
const bcrypt = require("bcrypt")

module.exports = {
    userLogin: async (req, res) => {

    },
    getAllUsers: async (req, res) => {
        try {
            const pool = await getConnection()
            const result = await pool.request().query("SELECT * FROM USUARIOS")
            res.status(200).json(result.recordset)
        } catch (error) {
            res.status(500).send(error.message || error)
        }
    },
    createUser: async (req, res) => {
        const { nombreYApellido, usuario, password, email, telefono, dni } = req.body
        try {
            const pool = await getConnection()
            const result = await pool.request()
                .input("nombreYApellido", sql.NVarChar, nombreYApellido)
                .input("usuario", sql.NVarChar, usuario)
                .input("password", sql.NVarChar, bcrypt.hashSync(password, 10))
                .input("email", sql.NVarChar, email)
                .input("telefono", sql.Int, telefono)
                .input("dni", sql.Int, dni)
                .query("INSERT INTO USUARIOS (nombreYApellido, usuario, password, email, telefono, dni) VALUES (@nombreYApellido, @usuario, @password, @email, @telefono, @dni)")
            res.status(201).json({ ...req.body })
        } catch (error) {
            res.status(500).send(error.message || error)
        }
    },
    editUser: async (req, res) => {
        const { nombreYApellido, usuario, password, email, telefono } = req.body
        const { id } = req.params
        try {
            const pool = await getConnection()
            const result = await pool.request()
                .input("id", id)
                .input("nombreYApellido", sql.NVarChar, nombreYApellido)
                .input("usuario", sql.NVarChar, usuario)
                .input("password", sql.NVarChar, bcrypt.hashSync(password, 10))
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