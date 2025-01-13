const express = require("express");
const router = express.Router();
const generateQrCodeController = require("../controllers/generateQrCodeController");

router.post("/generate_qr", generateQrCodeController.createQRCodeRecords);

module.exports = router;