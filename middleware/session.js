const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NOT_SESSION_TOKEN", 401);
      return;
    }
    // coge el token y quita 'bearer'
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);

    if (!tokenData._id) {
      handleHttpError(res, "ERROR_TOKEN_ID", 401);
      return;
    }

    //metemos en user el usuario que consulte algo
    const user = await usersModel.findById(tokenData._id);
    req.user = user;

    next();
  } catch (e) {
    console.log(e);
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = { authMiddleware };
