const express = require("express");
const router = express.Router();
const searchTreeController = require("../controllers/searchTreeController");

router.post("/search_tree", searchTreeController.searchTree);

module.exports = router;