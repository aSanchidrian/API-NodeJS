const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, //pone columna de 'createdAt' y 'updatedAt'
    versionKey: false,
  }
);

// module.exports = mongoose.model("<nombre de la 'tabla'>", <funcion>);

module.exports = mongoose.model("users", UserScheme);
