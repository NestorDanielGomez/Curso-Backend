//Definir la función mostrarLista que reciba una lista de datos y muestre su contenido, si no está vacía, o de lo contrario muestre el mensaje: “lista vacía”. Luego, invocarla con datos de prueba para verificar que funciona bien en ambos casos.

// function mostrarLista(listadedatos) {
//   if (listadedatos.length === 0) {
//     console.log("lista vacia");
//   } else {
//     console.log(listadedatos);
//   }
// }

// mostrarLista([1, 2, 3]);
// mostrarLista([]);

//Definir una función anónima que haga lo mismo que la del punto 1, e invocarla inmediatamente, pasando una lista con 3 números como argumento.
// (function mostrarLista(listadedatos) {
//   if (listadedatos.length === 0) {
//     console.log("lista vacia");
//   } else {
//     console.log(listadedatos);
//   }
// })([1, 2, 3]);

//Definir la función crearMultiplicador  que reciba un número y devuelva una función anónima que reciba segundo número y dé como resultado el producto de ambos. Luego, a partir de la función definida, crear dos funciones duplicar y triplicar, y probarlas con diferentes valores.

// function crearMultiplicador(numero) {
//   return function (segundo) {
//     return numero * segundo;
//   };
// }
// const duplicar = crearMultiplicador(2);
// const triplicar = crearMultiplicador(3);
// duplicar(7);

// console.log(triplicar());

// console.log(triplicar(6));

// En este ejercicio construiremos una herramienta que permita que diferentes personas puedan llevar cuentas individuales sobre algo que deseen contabilizar, al mismo tiempo que nos brinde una contabilidad general del total contado. Para ello:
// Definir la clase Contador.
// Cada instancia de contador debe ser identificada con el nombre de la persona responsable de ese conteo.
// Cada instancia inicia su cuenta individual en cero.
// La clase en sí misma posee un valor estático con el que lleva la cuenta de todo lo contado por sus instancias, el cual también inicia en cero.

class Contador {
  responsable;
  cuentaIndividual;
  static cuentaTotal = 0;

  constructor(responsable) {
    this.responsable = responsable;
    this.cuentaIndividual = 0;
  }
  // 4)    Definir un método obtenerResponsable que devuelva el nombre del responsable de la instancia.
  obtenerResponsable() {
    return this.responsable;
  }
  // 5)    Definir un método obtenerCuentaIndividual que devuelva la cantidad contada por la instancia.
  obtenerCuentaIndividual() {
    return this.cuentaIndividual;
  }
  // 6)    Definir un método obtenerCuentaGlobal que devuelva la cantidad contada por todos los contadores creados hasta el momento.
  obtenerCuentaGlobal() {
    return Contador.cuentaTotal;
  }
  // 7)    Definir el método contar que incremente en uno tanto la cuenta individual como la cuenta general
  contar() {
    this.cuentaIndividual++;
    Contador.cuentaTotal++;
  }
}

const primero = new Contador("primer responsable");
const segundo = new Contador("segundo responsable");
primero.contar();
primero.contar();

segundo.contar();
segundo.contar();
segundo.contar();

console.log(`primero individual: ${primero.obtenerCuentaIndividual()}`);
console.log(`primero global: ${primero.obtenerCuentaGlobal()}`);
