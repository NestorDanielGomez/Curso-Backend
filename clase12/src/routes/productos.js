const express = require("express");
const { ProductosController } = require("../controller/productos");

const { socketEmit } = require("../services/socket");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("LLEGO REQUEST GET PRODUCTOS");
  const productos = await ProductosController.getAll();
  res.json({
    data: productos,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params; //const id = req.params.id

  const producto = await ProductosController.getById(id);

  if (!producto)
    return res.status(404).json({
      msg: "Product not found",
    });

  res.json({
    data: producto,
  });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { title, price, img } = req.body;

  if (!title || !price || !img)
    return res.status(400).json({
      msg: "Falta Nombre o Precio o imagen en el Body",
    });

  const nuevoProducto = {
    title,
    price,
    img,
  };

  const result = await ProductosController.save(nuevoProducto);

  socketEmit("producto", result);

  res.json({ msg: nuevoProducto });
});

router.put("/:id", async (req, res) => {
  const { title, price, img } = req.body;
  const { id } = req.params; //const id = req.params.id

  const producto = await ProductosController.getById(id);

  if (!producto)
    return res.status(404).json({
      msg: "Product not found",
    });

  if (!nombre || !precio)
    return res.status(400).json({
      msg: "Falta Nombre o Precio en el Body",
    });

  const nuevoProducto = {
    title,
    price,
    img,
  };

  const result = await ProductosController.Update(id, nuevoProducto);

  res.json({
    data: result,
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params; //const id = req.params.id

  await ProductosController.deleteById(id);
  res.json({
    msg: "Ok",
  });
});

module.exports = router;
