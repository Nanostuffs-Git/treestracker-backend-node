const express = require("express");
const router = express.Router();
const linkQrToTrees = require("../controllers/linkQrToTrees");

router.post("/link_qr_code", linkQrToTrees.linkTreeToQRCode);

module.exports = router;