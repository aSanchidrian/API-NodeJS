const mongoose = require("mongoose");

const TracksScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR DE URL",
      },
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: String,
      },
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true, //pone columna de 'createdAt' y 'updatedAt'
    versionKey: false,
  }
);

// module.exports = mongoose.model("<nombre de la 'tabla'>", <funcion>);

module.exports = mongoose.model("tracks", TracksScheme);
