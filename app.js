require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo");
const { loggerStream } = require("./utils/handleLogger");
const morganBody = require("morgan-body");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});

const port = process.env.PORT || 3002;

// Invocamos a las rutas
// http://localhost:3001/api/tracks
app.use("/api", require("./routes"));

// http://localhost:3001/tracks
// app.use(require("./routes"));

app.listen(port, () => {
  console.log("Tu app esta lista por http://localhost:" + port);
});

dbConnect();
