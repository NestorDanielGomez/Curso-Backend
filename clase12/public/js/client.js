const boton = document.getElementById("botonLoad");
const table = document.getElementById("myTable");
const title = document.getElementById("title");
const price = document.getElementById("price");
const imagen = document.getElementById("urlimg");

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
  return response.json();
}

const socket = io();

socket.emit("allProducts");

socket.on("producto", (unProducto) => {
  attachRow(unProducto);
});

const attachRow = (unProducto) => {
  const fila = document.createElement("tr");
  fila.innerHTML = `<td>${unProducto.id}</td><td>${unProducto.title}</td> <td>${unProducto.price}</td>`;
  console.log(fila);
  table.appendChild(fila);
};

boton.addEventListener("click", async () => {
  try {
    const data = {
      title: title.value,
      price: price.value,
      img: imagen.value,
    };

    title.value = price.value = imagen.value = "";

    const url = "http://localhost:8080/productos";

    response = await postData(url, data);

    console.log(response);
  } catch (err) {
    console.log(err);
  }
});
