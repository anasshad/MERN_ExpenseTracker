const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB connected`.cyan.underline.bold);
  } catch (error) {
    console.log(`MongoDB Error: ${error.message}`.blue);
    process.exit(1);
  }
};

module.exports = connectDB;
