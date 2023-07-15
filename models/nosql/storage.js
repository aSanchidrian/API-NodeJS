const mongoose = require("mongoose");

const StorageScheme = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  {
    timestamps: true, //pone columna de 'createdAt' y 'updatedAt'
    versionKey: false,
  }
);

// module.exports = mongoose.model("<nombre de la 'tabla'>", <funcion>);

module.exports = mongoose.model("storage", StorageScheme);
