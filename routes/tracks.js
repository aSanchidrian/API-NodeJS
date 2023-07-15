const express = require("express");
const router = express.Router();

// http://localhost/tracks GET, POST, DELETE, PUT...

router.get("/tracks", (req, res) => {
  const data = ["hola", "mundo"];
  res.send({ data });
});

module.exports = router;
