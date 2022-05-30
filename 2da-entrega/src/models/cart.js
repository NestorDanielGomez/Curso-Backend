import mongoose from "mongoose";
import { productsCollectionName } from "./products";

export const cartCollectionName = "cart";

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: productsCollectionName,
        required: true,
        default: [],
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export const CartModel = mongoose.model(cartCollectionName, cartSchema);
