const fs = require("fs");

const MiBaseDeDatos = [];

class Contenedor {
  title;
  price;
  thumbnail;

  constructor(title, price, thumbnail) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }

  save(producto) {
    try {
      const leoArchivo = fs.readFileSync(`./basededatos.txt`, `utf-8`);
      console.log(leoArchivo);
      // console.log(leoArchivo.length);

      const idProducto = leoArchivo.length + 1;

      const productoAIngresar = {
        idProducto,
        title: producto.title,
        price: producto.price,
        thumbnail: producto.thumbnail,
      };
      const dato = leoArchivo.push(productoAIngresar);

      fs.writeFileSync(`./basededatos.txt`, dato);
    } catch (error) {
      console.log("error", error.message);
    }
  }
}

const pr1 = new Contenedor();

pr1.save({ title: "nombre", price: 123, thumbnail: "imagen" });
