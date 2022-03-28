const fs = require("fs");

class Contenedor {
  constructor(nombreArchivo) {
    this.archivo = nombreArchivo;
  }

  async save(objeto) {
    const data = await fs.promises.readFile(this.archivo, `utf-8`);
    const productos = JSON.parse(data);

    let id;
    if (productos.length === 0) id = 1;
    else id = productos[productos.length - 1].id + 1;
    const productonuevo = {
      id: id,
      title: objeto.title,
      price: objeto.price,
    };
    productos.push(productonuevo);
    await fs.promises.writeFile(
      this.archivo,
      JSON.stringify(productos, null, "\t")
    );
  }
  async getById(idProducto) {
    const data = await fs.promises.readFile(this.archivo, `utf-8`);
    const productos = JSON.parse(data);

    const indice = productos.findIndex((cadaProducto) => {
      if (cadaProducto.id === idProducto) return true;
      else return false;
    });

    if (indice === -1) return null;

    return productos[indice];
  }

  async getAll() {
    const data = await fs.promises.readFile(this.archivo, `utf-8`);
    const productos = JSON.parse(data);
    return productos;
  }

  async deleteById(number) {
    const data = await fs.promises.readFile(this.archivo, `utf-8`);
    const productos = JSON.parse(data);

    const nuevoArray = productos.filter(
      (unProducto) => unProducto.id != number
    );

    await fs.promises.writeFile(
      this.archivo,
      JSON.stringify(nuevoArray, null, "\t")
    );
  }

  async deleteAll() {
    const nuevo = [];

    await fs.promises.writeFile(
      this.archivo,
      JSON.stringify(nuevo, null, "\t")
    );
  }
}

const micontenedor = new Contenedor(`src/basedatos.json`);

// const producto1 = {
//   title: "nuevo producto",
//   price: 789,
// };

// const prod1 = new Contenedor();

module.exports = {
  Contenedor: micontenedor,
};
