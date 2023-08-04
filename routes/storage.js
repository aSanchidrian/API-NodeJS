const express = require("express");
const router = express.Router();
const upload = require("../utils/handleStorage");
const {
  getItems,
  getItem,
  createItem,
  deleteItem,
} = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");
// Estamos en http://localhost:3001/api/storage

router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.delete("/:id", validatorGetItem, deleteItem);
router.post("/", upload.single("myfile"), createItem);

module.exports = router;
