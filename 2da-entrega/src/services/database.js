import mongoose from "mongoose";


const connectionString = process.env.MONGO_ATLAS_SRV;

export const initMongoDB = async () => {
  try {
    console.log("CONECTANDO A MI DB");
    console.log(connectionString);
    await mongoose.connect(connectionString);

    console.log("YA ESTOY CONECTADO");
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};
