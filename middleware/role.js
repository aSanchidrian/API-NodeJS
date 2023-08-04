const { handleHttpError } = require("../utils/handleError");

const checkRole = (role) => (req, res, next) => {
  try {
    const { user } = req;
    const userRole = user.role;
    //comprueba si existe algun rol dentro de usuario en el array que se manda de routes
    const checkValue = role.some((singleRole) => userRole.includes(singleRole));

    if (!checkValue) {
      handleHttpError(res, "PERMISSION_DENIED", 403);
      return;
    }

    next();
  } catch (e) {
    handleHttpError(res, "ERROR_CHECKING_ROLE", 403);
    return;
  }
};

module.exports = { checkRole };
