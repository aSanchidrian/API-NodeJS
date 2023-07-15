const mongoose = require("mongoose");

const dbConnect = () => {
  const uri = process.env.DB_URI;
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected");
  } catch (err) {
    console.log("Error in connection: " + err);
  }
};

module.exports = dbConnect;
