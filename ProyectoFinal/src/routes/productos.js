const express = require("express");
const { ProductosController } = require("../Controllers/productosController");
const { validarAdmin } = require("../middlewares/permisos");

const router = express.Router();

router.get("/", async (request, response) => {
  const resultado = await ProductosController.getAll();
  response.json({
    titulo: "Todos los productos",
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
    titulo: `Producto con el id: ${req.params.id}`,
    data: producto,
  });
});

router.put("/:id", validarAdmin, async (req, res) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const { id } = req.params; //const id = req.params.id
  const producto = await ProductosController.getById(id);

  if (!producto)
    return res.status(404).json({
      msg: "Producto no encontrado",
    });

  if (!nombre || !descripcion || !codigo || !foto || !precio || !stock)
    return res.status(400).json({
      msg: "Los campos :nombre, descripcion,codigo,foto, precio,stock son todos obligatorios",
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
    titulo: "El producto actualizado es:",
    data: result,
  });
});

router.post("/", validarAdmin, async (req, res) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

  if (!nombre || !descripcion || !codigo || !foto || !precio || !stock)
    return res.status(400).json({
      msg: "Los campos :nombre, descripcion,codigo,foto, precio,stock son todos obligatorios",
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
    msg: "Nuevo producto Agregado:",
    data: resultado,
  });
});

router.delete("/:id", validarAdmin, async (request, response) => {
  const resultado = await ProductosController.deleteById(request.params.id);
  response.json({
    msg: ` El producto con el ${request.params.id} ha sido eliminado`,
  });
});

module.exports = router;
