const express = require("express");
const router = express.Router();
const myQrCodesController = require("../controllers/myQrCodesController");

router.post("/my_qr_code", myQrCodesController.getQrCodes);

module.exports = router;