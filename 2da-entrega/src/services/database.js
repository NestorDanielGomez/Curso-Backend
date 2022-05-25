import mongoose from "mongoose";

const connectionString = process.env.MONGO_ATLAS_SRV;

export const initMongoDB = async () => {
  try {
    console.log("CONECTANDO A DB");
    console.log(connectionString);
    await mongoose.connect(connectionString);

    console.log("CONECTADO");
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};
