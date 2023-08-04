const { matchedData } = require("express-validator");
const { usersModel } = require("../models");
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");

/**
 * registra un usuario
 * @param {*} req
 * @param {*} res
 */
const registerUser = async (req, res) => {
  try {
    req = matchedData(req);
    const hashedPass = await encrypt(req.password);
    const body = { ...req, password: hashedPass }; //concatena req + atributo password. Si ya hay uno, lo sobreescribe
    const dataUser = await usersModel.create(body);
    //quita password de la respuesta
    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_REGISTER");
  }
};

/**
 * loguea un usuario
 * @param {*} req
 * @param {*} res
 */
const loginUser = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel
      .findOne({ email: req.email })
      .select("password name role email");

    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }
    //aqui cogemos la pass hasheada de la bbdd
    const hashedPass = user.password;
    //aqui cogemos la pass sin hashear de la req
    const check = await compare(req.password, hashedPass);

    if (!check) {
      handleHttpError(res, "INVALID_PASSWORD", 401);
      return;
    }

    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user,
    };

    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_LOGIN");
  }
};

module.exports = { registerUser, loginUser };
