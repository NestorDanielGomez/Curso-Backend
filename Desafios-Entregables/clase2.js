// 1) Declarar una clase Usuario
class Usuario {
  // 2) Hacer que Usuario cuente con los siguientes atributos:
  // nombre: String
  // apellido: String
  // libros: Object[]
  // mascotas: String[]

  nombre;
  apellido;
  libros;
  mascotas;
  // Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  // 3) Hacer que Usuario cuente con los siguientes métodos:
  // getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
  getFullName() {
    return `Hola! soy ${this.nombre} ${this.apellido}`;
  }

  // addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
  addMascota(nombre) {
    this.mascotas.push(nombre);
  }
  // countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
  countMascotas() {
    return console.log(this.mascotas.length);
  }

  // addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
  addBook(nombre, autor) {
    this.libros.push({ nombre: nombre, autor: autor });
  }
  // getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.
  getBookNames() {
    const solonombre = [];
    this.libros.map((libro) => {
      solonombre.push(libro.nombre);
    });
    return console.log(solonombre);
  }
}

// 4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.

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
Usuario1.getFullName();
