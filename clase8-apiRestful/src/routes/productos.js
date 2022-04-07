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
  const resultadonuevo = await Contenedor.save(resultado);
  response.json({
    data: resultadonuevo,
  });
});

router.put("/:id", async (req, resp) => {
  let produto_a_modificar = await Contenedor.getById(req.params.id);

  const body = req.body;
  const nuevosvalores = {
    title: body.title,
    price: body.price,
  };

  produto_a_modificar = {
    title: nuevosvalores.title,
    price: nuevosvalores.price,
  };

  const resultado = await Contenedor.save(produto_a_modificar);
  resp.json({
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
