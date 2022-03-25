// Desarrollar una función ‘mostrarLetras’ que reciba un string como parámetro y permita mostrar una vez por segundo cada uno de sus caracteres.
// Al finalizar, debe invocar a la siguiente función que se le pasa también  como parámetro: const fin = () => console.log('terminé')
// Realizar tres llamadas a ‘mostrarLetras’ con el mensaje ‘¡Hola!’ y demoras de 0, 250 y 500 mS verificando que los mensajes de salida se intercalen.

// const palabra = "hola nestor";

// console.log(palabra.length);
// console.log(palabra[5]);

// const funcion = (parametro, letras, tiempo) => {
//   console.log("desde la callback", parametro, letras, tiempo);
// };

// const mostrarLetras = (parametro, tiempo, funcion) => {
//   let i = 0;
//   const letras = parametro.length;

//   const timer = setInterval(() => {
//     console.log(new Date(), parametro[i]);
//     i++;
//     if (i === letras) {
//       console.log("termino");
//       clearInterval(timer);
//       funcion(parametro, letras, tiempo);
//     }
//   }, tiempo);
// };

// mostrarLetras("pepito", 700, funcion);

// const fs = require("fs");

// console.log(__dirname);
// const pathamiarchivo = "./texto.txt";

// Realizar un programa que:
// A) Guarde en un archivo llamado fyh.txt la fecha y hora actual.
// const fs = require("fs");
// const archivo = "./fyh.txt";
// const fecha = Date();
// const texto = "texto desde file system";
// fs.writeFileSync(archivo, fecha);

// B) Lea nuestro propio archivo de programa y lo muestre por consola.
// try {
//   const lectura = fs.readFileSync(archivo, "utf-8");
//   console.log(lectura);
// } catch (error) {
//   console.log("ocurrio un error", error.message);
// }

// C) Incluya el manejo de errores con try catch (progresando las excepciones con throw new Error).

// Aclaración: utilizar las funciones sincrónicas de lectura y escritura de archivos del módulo fs de node.js

// Escribir un programa ejecutable bajo node.js que realice las siguientes acciones:
// A) Abra una terminal en el directorio del archivo y ejecute la instrucción: npm init -y.
//     Esto creará un archivo especial (lo veremos más adelante) de nombre package.json
// B) Lea el archivo package.json y declare un objeto con el siguiente formato y datos:

const fs = require(`fs`);
const pathArchivo = "./package.json";
const pathDestino = "./info.txt";
// C) Muestre por consola el objeto info luego de leer el archivo
fs.readFile(pathArchivo, "utf-8", (errRead, dataFile) => {
  if (errRead) console.log("Error Lectura", err);
  // console.log(dataFile);

  // D) Guardar el objeto info en un archivo llamado info.txt dentro de la misma carpeta de package.json
  //leo las estadisticas del archivo.
  fs.stat(pathArchivo, (errStat, stats) => {
    if (errStat) console.log("Error Lectura Estadisticas", err);

    const info = {
      contenidoStr: dataFile,
      contenidoObj: JSON.parse(dataFile),
      size: stats.size,
    };
    console.log(info.contenidoObj);
    const infoStringifycada = JSON.stringify(info, null, "\t");
    fs.writeFile(pathDestino, infoStringifycada, (err) => {
      console.log("Fin proceso");
    });
  });
  // E) Incluir el manejo de errores (con throw new Error)
});
