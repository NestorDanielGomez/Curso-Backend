import { Router } from "express";
import {
  getCarts,
  createCart,
  getCartById,
  addProductToCart,
  deleteCart,
} from "../controllers/cart";

const router = Router();

router.get("/", getCarts);

router.get("/:id", getCartById);

router.post("/", createCart);

router.put("/:idCart/:idProduct", addProductToCart);

router.delete("/:id", deleteCart);
export default router;
