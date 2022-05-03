const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { ProductosController } = require("../Controllers/productosController");

class Cart {
  constructor(nombreArchivo) {
    this.archivo = nombreArchivo;
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

  async filterCart(idcart) {
    // Traigo todos los carritos
    const FULLCART = await this.getAll();

    // Filtro al carrito especifico;
    const IDCART = FULLCART.findIndex((CART) => {
      if (CART.id === idcart) return true;
      else return false;
    });
    if (IDCART === -1) return null;
    const FILTERCART = FULLCART[IDCART];
    return FILTERCART;
  }

  async deleteProductOfCart(idcart, idproduct) {
    // Traigo todos los carritos
    const FULLCART = await this.getAll();

    // Filtro al carrito especifico;
    const IDCART = FULLCART.findIndex((CART) => {
      if (CART.id === idcart) return true;
      else return false;
    });
    if (IDCART === -1) return null;
    const FILTERCART = FULLCART[IDCART];

    // Borro el producto del carrito;
    const FILTERPRODUCT = FILTERCART.usercart.filter(
      (product) => product.id != idproduct
    );

    // Reemplazo el array del carrito especifico por el nuevo carrito
    const newCart = [];
    FILTERPRODUCT.forEach((element) => {
      newCart.push(element);
    });

    //Reemplazo el carrito especifico en el array de carritos
    FILTERCART.usercart = [];
    newCart.forEach((element) => {
      FILTERCART.usercart.push(element);
    });

    //Escribo el archivo con el array de carritos.
    await this.saveData(FULLCART);
    return FILTERCART;
  }

  async addProductToCart(idcart, idproduct) {
    // Traigo todos los carritos
    const FULLCART = await this.getAll();
    // Filtro al carrito especifico;
    const IDCART = FULLCART.findIndex((CART) => {
      if (CART.id === idcart) return true;
      else return false;
    });
    if (IDCART === -1) return null;
    const FILTERCART = FULLCART[IDCART];
    // Traigo el producto para agregar al carro
    const ProductToAdd = await ProductosController.getById(idproduct);
    console.log("id producto a agregar", ProductToAdd);
    // Sumo el producto al carro.
    const cart = FILTERCART.usercart;
    cart.push(ProductToAdd);
    //Reemplazo el carrito especifico en el array de carritos

    FILTERCART.usercart = [];

    cart.forEach((element) => {
      FILTERCART.usercart.push(element);
    });
    //Guardo la DB
    await this.saveData(FULLCART);
    return FILTERCART;
  }
}

const miCarrito = new Cart(`src/carrito.json`);

module.exports = {
  CartController: miCarrito,
};
