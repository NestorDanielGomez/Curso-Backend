const express = require("express");

const { ProductosController } = require("../Controllers/productosController");

const router = express.Router();

router.get("/", async (request, response) => {
  const resultado = await ProductosController.getAll();
  response.json({
    data: resultado,
  });
});

router.get("/:id", async (req, res) => {
  const producto = await ProductosController.getById(req.params.id);
  if (!producto)
    return res.status(404).json({
      msj: "producto no encontrado",
    });

  res.json({
    data: producto,
  });
});

router.put("/:id", async (req, res) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const { id } = req.params; //const id = req.params.id
  const producto = await ProductosController.getById(id);

  if (!producto)
    return res.status(404).json({
      msg: "Producto no encontrado",
    });

  if (!nombre || !precio)
    return res.status(400).json({
      msg: "Falta Nombre o Precio en el Body",
    });

  const nuevoProducto = {
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
  };

  const result = await ProductosController.Update(id, nuevoProducto);

  res.json({
    data: result,
  });
});

router.post("/", async (req, res) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

  if (!nombre || !precio)
    return res.status(400).json({
      msg: "Falta Nombre o Precio en el Body",
    });

  const nuevoProducto = {
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
  };

  const resultado = await ProductosController.save(nuevoProducto);
  res.json({
    msg: "Post de Productos",
    data: resultado,
  });
});

router.delete("/:id", async (request, response) => {
  const resultado = await ProductosController.deleteById(request.params.id);
  response.json({
    msg: "producto eliminado",
  });
});

module.exports = router;
