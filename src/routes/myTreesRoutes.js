const express = require("express");
const router = express.Router();
const myTreesController = require("../controllers/myTreesController");

router.post("/my_trees", myTreesController.getTreeByUsername);

module.exports = router;