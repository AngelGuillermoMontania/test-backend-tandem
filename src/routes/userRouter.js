const userController = require("./../controllers/userController");
const { Router } = require('express');

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/login', userController.userLogin);
router.post('/', userController.createUser);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;