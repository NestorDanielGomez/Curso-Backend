const express = require("express");
const { Contenedor } = require("../contenedor");

const router = express.Router();

router.get("/", async (request, response) => {
  const resultado = await Contenedor.getAll();
  response.json({
    data: resultado,
  });
});

router.get("/:id", async (request, response) => {
  const resultado = await Contenedor.getById(request.params.id);
  response.json({
    data: resultado,
  });
});

router.post("/", async (req, res) => {
  const body = req.body;
  const nuevoProducto = {
    title: body.title,
    price: body.price,
  };
  const resultado = await Contenedor.save(nuevoProducto);
  res.json({
    data: resultado,
  });
});

router.delete("/:id", async (request, response) => {
  const resultado = await Contenedor.deleteById(request.params.id);
  response.json({
    data: resultado,
  });
});

module.exports = router;
