const express = require("express");
const verify = require("../controllers/verifyToken");
const router = express.Router();
const {
  getTransactions,
  addTransactions,
  deleteTransactions
} = require("../controllers/transactions");

router
  .route("/")
  .get(verify, getTransactions)
  .post(verify, addTransactions);

router.route("/:id").delete(verify, deleteTransactions);

module.exports = router;
