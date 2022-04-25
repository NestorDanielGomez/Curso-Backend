const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class Productos {
  constructor(nombreArchivo) {
    this.archivo = nombreArchivo;
  }

  async getData() {
    const data = await fs.promises.readFile(this.archivo, "utf-8"); //data = '[]'
    return JSON.parse(data);
  }

  async saveData(data) {
    await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, "\t"));
  }

  async save(objeto) {
    const productos = await this.getData();

    let id;

    const productonuevo = {
      id: uuidv4(),
      title: objeto.title,
      price: objeto.price,
      img: objeto.img,
    };
    productos.push(productonuevo);
    await this.saveData(productos);
    return productonuevo;
  }

  async getById(idProducto) {
    const productos = await this.getData();

    const indice = productos.findIndex((producto) => {
      if (producto.id === idProducto) return true;
      else return false;
    });

    if (indice === -1) return null;

    return productos[indice];
  }

  async getAll() {
    const productos = await this.getData();
    return productos;
  }

  async deleteById(number) {
    const productos = await this.getData();

    const nuevoArray = productos.filter(
      (unProducto) => unProducto.id != number
    );

    await this.saveData(nuevoArray);
  }

  async deleteAll() {
    const listadolimpio = [];

    await this.save(listadolimpio);
  }

  async Update(id, nuevaData) {
    const productos = await this.getData();

    const indice = productos.findIndex((unProducto) => unProducto.id === id);

    if (indice < 0) throw new Error("no existe el producto");

    const productoActualizado = {
      id,
      ...nuevaData,
    };

    productos.splice(indice, 1, productoActualizado);

    await this.saveData(productos);

    return productoActualizado;
  }
}

const ProductosController = new Productos(`src/basedatos.json`);

module.exports = {
  ProductosController: ProductosController,
};
