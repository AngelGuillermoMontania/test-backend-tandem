const userController = require("./../controllers/userController");
const { Router } = require("express");

// middlewares
const loginValidator = require("../validations/loginValidator");
const createUserValidator = require("../validations/createUserValidator");
const editUserValidator = require("../validations/editUserValidator");

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/login", loginValidator, userController.userLogin);
router.post("/", createUserValidator, userController.createUser);
router.put(":/id", editUserValidator, userController.editUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;