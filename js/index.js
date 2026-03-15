import "../components/app-root.js";
import "../components/tab-system/tab-system.js";
import datos from "../data/entrenos.json" with { type: "json" };

console.log("datos:", datos.length);

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".calendar");
  console.log("dato unico:", datos[1].id);

  for (const entreno of datos) {
    const link = document.createElement("a");
    link.href = `dias/${entreno.id}`;

    //Agregar estilos a la card
    link.classList.add("day-card");
    if (entreno.id % 2 !== 0) link.classList.add("disabled");
    if (entreno.id === "21") link.classList.remove("disabled");
    if (entreno.id === "22") link.classList.add("full");

    //Descripción de las Card
    const titulo = document.createElement("h2");
    titulo.textContent = entreno.id;
    //Span
    const descripcion = document.createElement("span");
    descripcion.textContent = entreno.tipo === "Descanso" ? "Descanso" : "Entreno";
    if (entreno.id === "21") descripcion.textContent = "Caminata";
    if (entreno.id === "22") descripcion.textContent = " 🏁🚀🎯 Competencia 🏆🚩🏁";

    //Agrego al Link
    link.appendChild(titulo);
    link.appendChild(descripcion);

    navbar.appendChild(link);
  }
});
