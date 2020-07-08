const Transaction = require("../models/Transaction");
// @desc GET all transactions
// @route GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req, res, next) => {
  console.log(req.user);
  try {
    const transactions = await Transaction.find({ userId: req.user._id });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// @desc Add transactions
// @route POST /api/v1/transactions
// @access Public
exports.addTransactions = async (req, res, next) => {
  console.log({
    ...req.body,
    userId: req.user._id
  });
  try {
    const transaction = await Transaction.create({
      ...req.body,
      userId: req.user._id
    });

    return res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error"
      });
    }
  }
};

// @desc DELETE transaction
// @route DELETE /api/v1/transactions
// @access Public
exports.deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(400).json({
        success: false,
        error: "No such transaction found"
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};
