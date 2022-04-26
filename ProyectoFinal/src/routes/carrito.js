const express = require("express");
const { v4: uuidv4 } = require("uuid");

let carrito = [];

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    msj: "mi carrito",
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

router.post("/", (req, res) => {
  const body = req.body;

  const micarrito = {
    id: uuidv4(),
    timestamp: Date.now(),
    nombre: body.nombre,
    raza: body.raza,
    edad: body.edad,
  };

  mascotas.push(micarrito);
  res.json({
    nuevaMascota,
  });
});

module.exports = router;
