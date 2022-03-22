const { Console } = require("console");
const fs = require("fs");

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
    console.log(producto);
    const dataDelArchivo = fs.readFileSync(`./basededatos.txt`, `utf-8`);
    console.log(dataDelArchivo);
    const misDatos = JSON.parse(dataDelArchivo);

    const id = misDatos.length + 1;
    console.log(misDatos, id);
    const producto_a_ingresar = {
      id,
      title: producto.title,
      price: producto.price,
      thumbnail: producto.thumbnail,
    };
    console.log(producto_a_ingresar);

    const datos1 = misDatos.push(producto_a_ingresar);
    console.log(datos1);
    const misDatosstring = JSON.stringify(datos1);
    fs.writeFileSync(`./basededatos.txt`, datos1);

    console.log(misDatosstring, id);

    // return id;
  }
}

const dataproducto1 = {};

producto1 = new Contenedor();

producto1.save({ title: "loro", price: "perro", thumbnail: "gato" });
