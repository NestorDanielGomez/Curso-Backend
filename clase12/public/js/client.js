const boton = document.getElementById("BtnSubmit");
const mitabla = document.getElementById("myTable");
const title = document.getElementById("title");
const price = document.getElementById("price");
const imagen = document.getElementById("urlimg");

const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages"); //
const msg = document.getElementById("msg");
const roomName = document.getElementById("room-name");
const usersList = document.getElementById("users");

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
  const fila = document.createElement(`tr`);
  fila.innerHTML = `<td>${unProducto.id}</td><td>${unProducto.title}</td><td>${unProducto.price}</td><td> <img src=${unProducto.img} alt=${unProducto.title} height="50" width="50"/>  </td>`;

  mitabla.appendChild(fila);
};

boton.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const data = {
      title: title.value,
      price: price.value,
      img: imagen.value,
    };

    title.value = price.value = imagen.value = "";

    const url = "http://localhost:8080/api/productos";

    response = await postData(url, data);

    console.log(response);
  } catch (err) {
    console.log(err);
  }
});

//Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Emit Message to the server
  socket.emit("chatMessage", msg.value);

  //Clear submitted message
  msg.value = "";
});

function addMessage(e) {
  const mensaje = {
    author: document.getElementById("username").value,
    text: document.getElementById("texto").value,
  };
  socket.emit("new-message", mensaje);
  return false;
}

function outputMessage(data) {
  console.log(`viene desde array`, data);
  const div = document.createElement("div");

  const html = data
    .map((elem, index) => {
      return `<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;

  chatMessages.appendChild(div);
}

function render(data) {
  const hora = new Date();
  const html = data
    .map((elem, index) => {
      return `<div>
       <strong>${hora}</strong>:
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
}

socket.on("messages", function (data) {
  render(data);
});

socket.on("messages", function (data) {
  render(data);
});
