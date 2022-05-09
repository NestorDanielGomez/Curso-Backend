import { Router, Request, Response } from "express";
import ProductsRouter from "./products";

const router = Router();

router.get(`/`, (req: Request, res: Response) => {
  res.json({ msg: "Hola desde router/index.js" });
});
router.use("/products", ProductsRouter);

export default router;
