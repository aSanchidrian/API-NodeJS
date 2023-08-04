const express = require("express");
const router = express.Router();
const customHeader = require("../middleware/customHeader");
const { authMiddleware } = require("../middleware/session");
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/tracks");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/tracks");
const { checkRole } = require("../middleware/role");

//  Estamos en http://localhost/api/tracks GET, POST, DELETE, PUT...

// GET - Comprueba que el usuario tenga sesion
router.get("/", authMiddleware, getItems);
// POST
router.post(
  "/",
  authMiddleware,
  checkRole(["admin"]),
  validatorCreateItem,
  createItem
);
// router.get("/:id/:var1/:var2...", getItem);
router.get("/:id", authMiddleware, validatorGetItem, getItem);

router.put(
  "/:id",
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateItem
);

router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;
