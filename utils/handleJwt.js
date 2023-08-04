const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

/**
 * pasar el objeto del usuario
 * @param {*} user
 */
const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    secret,
    {
      expiresIn: "2h",
    }
  );

  return sign;
};

/**
 * Pasar el token JWT
 * @param {*} token
 * @returns
 */
const verifyToken = async (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};

module.exports = { tokenSign, verifyToken };
