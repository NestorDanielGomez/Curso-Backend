import { Router } from "express";
import productsRouter from "./products";
import categoriesRouter from "./category";
import cartRouter from "./cart";

const router = Router();

router.use("/products", productsRouter);
router.use("/cart", cartRouter);
router.use("/categories", categoriesRouter);

export default router;
