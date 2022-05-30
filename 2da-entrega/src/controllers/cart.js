import { CartModel } from "../models/cart";
import { ProductsModel } from "../models/products";

export const getCarts = async (req, res) => {
  try {
    const carts = await CartModel.find();

    res.json({
      title: "Carritos",
      data: carts,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const createCart = async (req, res) => {
  try {
    const cartCreated = await CartModel.create({});

    res.json({
      data: cartCreated,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const getCartById = async (req, res) => {
  try {
    const { id } = req.params;

    const carrito = await CartModel.findById(id);

    if (!carrito)
      return res.status(404).json({
        msgs: "Carrito not found!",
      });

    res.json({
      data: carrito,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { idCart, idProduct } = req.params;

    const product = await ProductsModel.findById(idProduct);
    const cart = await CartModel.findById(idCart);

    if (!cart || !product)
      return res.status(404).json({
        msgs: "Element not found!",
      });
    cart.products.push(product);
    cart.save();
    res.json({
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await CartModel.findByIdAndDelete(id);

    if (!cart)
      return res.status(404).json({
        msgs: "Cart not found!",
      });
    res.json({
      msg: "Cart deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};
