//Item 1 y 2

class Usuario {
  nombre;
  apellido;
  libros;
  mascotas;

  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    console.log(`Hola! soy ${this.nombre} ${this.apellido}`);
  }
  addMascota(nombre) {
    return this.mascotas.push(nombre);
  }
  countMascotas() {
    return console.log(this.mascotas.length);
  }
  addBook(nombre, autor) {
    this.libros.push({ nombre: nombre, autor: autor });
  }
  getBookNames() {
    const solonombre = [];
    this.libros.map(libro, () => {
      solonombre.push(libro.nombre);
    });
    return console.log(solonombre);
  }
}

//Item 2
const Usuario1 = new Usuario(
  `Nestor`,
  `Gomez`,
  [
    { nombre: "Aprendiendo Backend", autor: "Nestor Gomez" },
    { nombre: "Rprobando Curso", autor: "Daniel Gomez" },
  ],
  ["perro", "loro"]
);
const Usuario2 = new Usuario(
  `Leticia`,
  `Zanel`,
  ["Codivo Da Vinci", "Matrix"],
  ["gato", "perro"]
);

// console.log(Usuario1);
// console.log(Usuario2);

//Item 3
// console.log(Usuario1.getFullName());
// Usuario1.addMascota("rana");
// // console.log(Usuario1);
// Usuario2.countMascotas();
// Usuario1.addBook("libro desde mi funcion", "Nestor");
// console.log(Usuario1);
Usuario1.getBookNames();
