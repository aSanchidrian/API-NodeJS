//los controladores tienen que devolver algo: res.send();

const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
/**
 * obtener la lista de la base de datos
 * para poner await, la funcion tiene que ser async
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  //busca
  try {
    const user = req.user;
    const data = await tracksModel.find({});
    res.send({ user, data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

/**
 * obtener un item concreto
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.findById(id);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

/**
 * inserta un registro en la base de datos
 * recivimos un dato que tiene que cumplir con el ../models/track
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req); //comprueba que no se manden mas datos de los definidos
    console.log(body);
    const data = await tracksModel.create(body);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};

/**
 * actualiza un registro en la base de datos
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    console.log(req);
    const { id, ...body } = matchedData(req);
    // {new: true} lo devuelve ya cambiado, sino, lo actualiza pero devuelve antes de actualizar
    const data = await tracksModel.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
};

/**
 * borra un registro en la base de datos
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.delete({ _id: id });
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
