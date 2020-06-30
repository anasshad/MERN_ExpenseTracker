const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
dotenv.config({ path: __dirname + "/.env" });

//Import Routes
const transactions = require("./routes/transactions");
const users = require("./routes/users");

connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Configure Routes
app.use("/api/v1/transactions", transactions);
app.use("/api/user", users);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} at port ${PORT}`.yellow.bold
  )
);
