const express = require("express");

const { Contenedor } = require("../contenedor");

const router = express.Router();

router.get("/", async (request, response) => {
  const resultado = await Contenedor.getAll();
  response.json({
    data: resultado,
  });
});

router.get("/:id", async (req, res) => {
  const producto = await Contenedor.getById(req.params.id);
  if (!producto)
    return res.status(404).json({
      msj: "producto no encontrado",
    });

  res.json({
    data: producto,
  });
});

router.put("/:id", async (req, res) => {
  const { title, precio } = req.body;
  const { id } = req.params; //const id = req.params.id
  const producto = await Contenedor.getById(id);

  if (!producto)
    return res.status(404).json({
      msg: "Producto no encontrado",
    });

  if (!title || !precio)
    return res.status(400).json({
      msg: "Falta Nombre o Precio en el Body",
    });

  const nuevoProducto = {
    title,
    precio,
  };

  const result = await Contenedor.Update(id, nuevoProducto);

  res.json({
    data: result,
  });
});

router.post("/", async (req, res) => {
  const body = req.body;
  const { title, precio } = req.body;

  if (!title || !precio)
    return res.status(400).json({
      msg: "Falta Nombre o Precio en el Body",
    });

  const nuevoProducto = {
    title,
    precio,
  };

  const resultado = await Contenedor.save(nuevoProducto);
  res.json({
    msg: "Post de Productos",
    data: resultado,
  });
});

router.delete("/:id", async (request, response) => {
  const resultado = await Contenedor.deleteById(request.params.id);
  response.json({
    msg: "producto eliminado",
  });
});

module.exports = router;
