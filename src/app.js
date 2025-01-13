const express = require("express");
const bodyParser = require("body-parser");
const exampleRoutes = require("./routes/exampleRoutes");
const loginRoutes = require("./routes/loginRoutes");
const myTreesRoutes = require("./routes/myTreesRoutes");
const myQrCodesRoutes = require("./routes/myQrCodesRoutes");
const generateQrCodeRoutes = require("./routes/generateQrCodeRoutes");
const searchTreeRoute = require("./routes/searchTreeRoute");
const linkQrToTrees = require("./routes/linkQrToTrees");

require("dotenv").config(); // Load environment variables

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/examples", exampleRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/trees", myTreesRoutes, searchTreeRoute);
app.use("/api/qrcode", myQrCodesRoutes, generateQrCodeRoutes, linkQrToTrees);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

module.exports = app;
