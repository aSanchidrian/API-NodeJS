const bcryptjs = require("bcryptjs");
/**
 * Pasar contrasenia para cifrar
 * @param {*} pass
 * @returns
 */
const encrypt = async (pass) => {
  return await bcryptjs.hash(pass, 10);
};

/**
 * Pasar contrasenia y hash de la contrasenia
 * @param {*} pass
 * @param {*} hash
 * @returns
 */
const compare = async (pass, hash) => {
  return await bcryptjs.compare(pass, hash);
};

module.exports = { encrypt, compare };
