//los controladores tienen que devolver algo: res.send();
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
const fs = require("fs");
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const storage = require("../models/nosql/storage");

/**
 * obtener la lista de la base de datos
 * para poner await, la funcion tiene que ser async
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  //busca
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "STORAGE_ERROR_GET_ITEMS");
  }
};

/**
 * obtener un item concreto
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "STORAGE_ERROR_GET_ITEM");
  }
};

/**
 * inserta un registro en la base de datos
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const { body, file } = req;
    console.log(file);

    //antes de crear en la bbdd sacamos los datos con 'file'
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };

    const result = await storageModel.create(fileData);

    res.send({ result });
  } catch (e) {
    handleHttpError(res, "STORAGE_ERROR_CREATE_ITEM");
  }
};

/**
 * borra un registro en la base de datos
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataFile = await storageModel.findById(id);
    await storageModel.deleteOne({ _id: id });
    const { filename } = dataFile;
    const filepath = `${MEDIA_PATH}/${filename}`;

    fs.unlinkSync(filepath);
    const data = {
      filepath,
      deleted: 1,
    };

    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "STORAGE_ERROR_DELETE_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, deleteItem };
