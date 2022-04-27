const express = require("express");
const { CartController } = require("../Controllers/carritoController");
const { ProductosController } = require("../Controllers/productosController");
let userCart = [];

const router = express.Router();

router.get("/", async (req, res) => {
  const ALLCARTS = await CartController.getAll();
  res.json({
    msj: "mi carrito",
    data: ALLCARTS,
  });
});

router.get("/:id", async (req, res) => {
  const CART = await CartController.getById(req.params.id);

  if (!CART)
    return res.status(404).json({
      msj: "El Carrito no existe",
    });

  if (CART.usercart.length == 0)
    return res.status(404).json({
      msj: "El Carrito esta vacio",
    });

  res.json({
    data: CART,
  });
});

router.get("/:id/productos", async (req, res) => {
  const CART = await CartController.getById(req.params.id);

  // if (!CART.usercart)
  //   return res.status(404).json({
  //     msj: "carrito vacio",
  //   });

  res.json({
    data: CART.usercart,
  });
});

router.post("/", async (req, res) => {
  const AddCart = await CartController.save();

  res.json({
    msg: "ID del nuevo carrito",
    id: AddCart,
  });
});

// router.post("/:id/productos/:id_prod", async (req, res) => {
//   const AddCart = await CartController.save();

//   res.json({
//     msg: "ID del nuevo carrito",
//     id: AddCart,
//   });
// });

router.delete("/:id", async (req, res) => {
  const resultado = await CartController.deleteById(req.params.id);
  res.json({
    msg: "producto eliminado",
  });
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
  const array = await CartController.deleteProductOfCart(
    req.params.id,
    req.params.id_prod
  );

  res.json({
    data: array,
  });
});

module.exports = router;
