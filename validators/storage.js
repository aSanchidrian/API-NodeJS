const { check } = require("express-validator");
const { validateResults } = require("../utils/handleValidator");

const validatorGetItem = [
  check("id").exists().notEmpty().isMongoId(),
  (res, req, next) => validateResults(res, req, next),
];

module.exports = { validatorGetItem };
