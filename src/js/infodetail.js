import datos from "../data/entrenos.json" with { type: "json" };

document.addEventListener("DOMContentLoaded", () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  const dato = datos.find((info) => info.id === id);
  console.log("dato", dato);

  const idSpan = document.querySelector("#id");
  /* idSpan.textContent = id; */
});
