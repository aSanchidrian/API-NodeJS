const models = {
  //por cada modelo, lo llamo con 'require'
  //para llamarlo solo importo "require('./models')"
  usersModel: require("./nosql/users"),
  tracksModel: require("./nosql/tracks"),
  storageModel: require("./nosql/storage"),
};

module.exports = models;
