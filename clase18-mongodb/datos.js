const dataMsg = [
  { author: "Nestor", mensajes: "Mensaje del Alumno", date: ISODate() },
  { author: "Facundo", mensajes: "Mensaje del Tutor", date: ISODate() },
  { author: "Cristian", mensajes: "Mensaje del Profesor", date: ISODate() },
  { author: "Coderhouse", mensajes: "Mensaje", date: ISODate() },
  { author: "Noelia", mensajes: "Mensaje", date: ISODate() },
  { author: "Walter", mensajes: "Mensaje", date: ISODate() },
  { author: "Nicolas", mensajes: "Mensaje", date: ISODate() },
  { author: "Noelia", mensajes: "Mensaje", date: ISODate() },
  { author: "Bautista", mensajes: "Mensaje", date: ISODate() },
  { author: "Leticia", mensajes: "Mensaje", date: ISODate() },
];
const dataProductos = [
  { producto: "Goma", precio: 100, date: ISODate() },
  { producto: "Birome", precio: 200, date: ISODate() },
  { producto: "Regla", precio: 300, date: ISODate() },
  { producto: "Fibras", precio: 500, date: ISODate() },
  { producto: "Carpeta", precio: 1150, date: ISODate() },
  { producto: "Cartuchera", precio: 2150, date: ISODate() },
  { producto: "Block de Hojas", precio: 3000, date: ISODate() },
  { producto: "Boligoma", precio: 150, date: ISODate() },
  { producto: "Escuadra", precio: 700, date: ISODate() },
  { producto: "Transportador", precio: 600, date: ISODate() },
  { producto: "Mochila", precio: 4990, date: ISODate() },
];

const Msg = [{ author: "Nestor", mensajes: "Otro Mensaje", date: ISODate() }];

const q1 = { $and: [{ precio: { lt: 1000 } }, { precio: { gt: 3000 } }] };

db.createUser({
  user: "pepe",
  pwd: "asd456",
  roles: [{ role: "read", db: "ecommerce" }],
});
