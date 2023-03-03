const userController = require("./../controllers/userController");
const { Router } = require("express");

const router = Router();

// middlewares
const loginValidator = require("../validations/loginValidator");
const createUserValidator = require("../validations/createUserValidator");
const editUserValidator = require("../validations/editUserValidator");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, userController.getAllUsers);
router.post("/login", loginValidator, userController.userLogin);
router.post("/", verifyToken, createUserValidator, userController.createUser);
router.get("/:id", verifyToken, editUserValidator, userController.getOneUser);
router.put("/:id", verifyToken, editUserValidator, userController.editUser);
router.delete("/:id", verifyToken, userController.deleteUser);

module.exports = router;