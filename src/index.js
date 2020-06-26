const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
dotenv.config({ path: __dirname + "/.env" });

const transactions = require("./routes/transactions");

connectDB();

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

app.use("/api/v1/transactions", transactions);

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} at port ${PORT}`.yellow.bold
  )
);
