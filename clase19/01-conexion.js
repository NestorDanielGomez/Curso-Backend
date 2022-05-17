const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/MongoDBNestor";

const initMongoDB = async () => {
  try {
    console.log("conectando a mi db...");
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("ya estoy conectado");
  } catch (error) {
    console.log(`Ocurrio un error: ${error}`);
  }
};

const disconectMongoDB = async () => {
  try {
    console.log("desconectando a mi db....");
    await mongoose.disconnect(connectionString);
    console.log("desconexion OK");
  } catch (error) {
    console.log(`Ocurrio un error: ${error}`);
  }
};

module.exports = { initMongoDB, disconectMongoDB };
