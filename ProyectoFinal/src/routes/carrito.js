const express = require("express");
const { CartController } = require("../Controllers/carritoController");
const { ProductosController } = require("../Controllers/productosController");

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

  if (!CART.usercart)
    return res.status(404).json({
      msj: "El Carro esta Vacio",
    });

  res.json({
    titulo: "los productos de tu carro son:",
    data: CART.usercart,
  });
});

router.post("/", async (req, res) => {
  const AddCart = await CartController.save();

  res.json({
    titulo: "Carrito creado con el ID:",
    id: AddCart,
  });
});

router.post("/:id/productos/:id_prod", async (req, res) => {
  const BuscoProducto = await ProductosController.getById(req.params.id_prod);

  if (BuscoProducto == null) {
    return res.status(404).json({
      msj: "El producto no existe",
    });
  }

  const product = await CartController.addProductToCart(
    req.params.id,
    req.params.id_prod
  );

  res.json({
    msg: "Los productos de tu carrito son:",
    data: product,
  });
});

router.delete("/:id", async (req, res) => {
  const resultado = await CartController.deleteById(req.params.id);
  res.json({
    titulo: `El Carro con el id: ${req.params.id}`,
    msg: "FUE ELIMINADO",
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
