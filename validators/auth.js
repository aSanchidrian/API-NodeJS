const { check } = require("express-validator");
const { validateResults } = require("../utils/handleValidator");

const validatorRegister = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 50 }),
  check("age").exists().notEmpty().isNumeric(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3, max: 10 }),
  (res, req, next) => validateResults(res, req, next),
];

const validatorLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3, max: 10 }),
  (res, req, next) => validateResults(res, req, next),
];

module.exports = { validatorRegister, validatorLogin };
