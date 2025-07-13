// script.js
const ramos = [
  { nombre: "Biología I", semestre: 1, descripcion: "Ramo introductorio" },
  { nombre: "Química General", semestre: 1, descripcion: "Fundamentos de química" },
  { nombre: "Anatomía", semestre: 2, descripcion: "Estudio del cuerpo humano" },
];

const container = document.getElementById("malla-container");

ramos.forEach(ramo => {
  const div = document.createElement("div");
  div.className = "ramo";
  div.innerText = ramo.nombre;
  div.title = ramo.descripcion;
  container.appendChild(div);
});


