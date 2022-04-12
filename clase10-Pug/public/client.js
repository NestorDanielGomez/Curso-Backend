const boton = document.getElementById("boton");
const title = document.getElementById("title");
const price = document.getElementById("price");

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

boton.addEventListener("click", async () => {
  try {
    const data = {
      title: title.value,
      price: price.value,
    };

    title.value = price.value = "";

    const url = "http://localhost:8080/api/productos";

    response = await postData(url, data).then((response) => response.json);

    console.log(response);
  } catch (err) {
    console.log(err);
  }
});
