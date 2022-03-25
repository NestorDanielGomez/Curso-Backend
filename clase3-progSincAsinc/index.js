const array = [1, 2, 3, 4];

// const prueba = (data) =>
//   array.forEach((element) => {
//     console.log(element * 2);
//   });

// prueba(array);

// const prueba2 = (data) =>
//   array.forEach((element) => {
//     element * 2;
//   });

// console.log(prueba2(array));

// Definiremos una función llamada operación que reciba como parámetro dos valores y una función con la operación que va a realizar. Deberá retornar el resultado.

// Definiremos las siguientes funciones: suma, resta, multiplicación, división y módulo. Estas recibirán dos valores y devolverán el resultado. Serán pasadas como parámetro en la llamada a la función operación

// Todas las funciones tendrán que ser realizadas con sintaxis flecha.

// const otro = setTimeout(() => {
//   console.log("pepe");
// }, 2000);

// otro();
let i = 0;

const funcionpersonalizada = () => {
  console.log(new Date(), "ejecucion periodica", i);
  i++;
  if (i > 5) {
    clearInterval(funcion);
    console.log(new Date(), "ejecucion detenida");
  }
};

const funcion = setInterval(funcionpersonalizada, 2000);
