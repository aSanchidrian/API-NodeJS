const express = require("express");
const fs = require("fs");
const router = express.Router();

const pathRoute = __dirname;

// Quita la extension del archivo: index.js -> index
const removeExt = (fileName) => {
  return fileName.split(".").shift();
};

fs.readdirSync(pathRoute).filter((file) => {
  const name = removeExt(file); //index.js, users.js, tracks.js ...

  if (name !== "index") {
    router.use(`/${name}`, require(`./${file}`)); //http://localhost:3001/api/tracks
  }
});

module.exports = router;
