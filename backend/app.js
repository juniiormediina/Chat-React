const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

/* Initializations */
const app = express();

/* Middlewares */
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.options("*", cors());

/* Routes */
app.use("/users", require("./routes/user.routes"));

module.exports = app;
