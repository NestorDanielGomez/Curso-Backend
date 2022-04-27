const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { ProductosController } = require("../Controllers/productosController");

class Cart {
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

  async save() {
    const allCarts = await this.getData();
    const nuevocarro = {
      id: uuidv4(),
      timestamp: Date.now(),
      usercart: [],
    };
    allCarts.push(nuevocarro);
    await this.saveData(allCarts);
    return nuevocarro.id;
  }

  async getById(idCart) {
    const carritos = await this.getData();
    const indice = carritos.findIndex((carrito) => {
      if (carrito.id === idCart) return true;
      else return false;
    });

    if (indice === -1) return null;

    return carritos[indice];
  }

  async getAll() {
    const productos = await this.getData();
    return productos;
  }

  async deleteById(cart_to_delete) {
    const ALLCARTS = await this.getData();

    const NEW_ALLCARTS = ALLCARTS.filter((cart) => cart.id != cart_to_delete);

    await this.saveData(NEW_ALLCARTS);
  }

  async deleteProductOfCart(idcart, idproduct) {
    const FULLCART = await this.getById(idcart);
    const productosdecarrito = FULLCART.usercart;
    const nuevoArray = productosdecarrito.filter(
      (unProducto) => unProducto.id != idproduct
    );

    console.log(nuevoArray);
  }
}

const miCarrito = new Cart(`src/carrito.json`);

module.exports = {
  CartController: miCarrito,
};
