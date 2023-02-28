const indexController = require("./../controllers/indexController");
const { Router } = require("express");

const router = Router();

router.get("/", indexController.index);

module.exports = router;