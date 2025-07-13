<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Malla Interactiva - Biotecnología Molecular</title>
  <style>
    body {
      background-color: white;
      font-family: sans-serif;
      padding: 20px;
    }

    .malla {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      gap: 10px;
    }

    .ramo {
      background-color: #eee;
      border-radius: 6px;
      padding: 10px;
      text-align: center;
      font-size: 14px;
      cursor: not-allowed;
      color: #aaa;
      transition: background-color 0.3s, color 0.3s;
      user-select: none;
    }

    .ramo.activo {
      background-color: #d0e9ff;
      color: #000;
      cursor: pointer;
    }

    .ramo.aprobado {
      text-decoration: line-through;
      background-color: #b0ffb0;
    }
  </style>
</head>
<body>
  <h1>Malla Interactiva - Ingeniería en Biotecnología Molecular</h1>
  <div class="malla" id="malla"></div>

  <script>
    const ramos = [
      { id: "mate1", nombre: "Matemáticas I", prereq: [] },
      { id: "quim1", nombre: "Química General I", prereq: [] },
      { id: "bio1", nombre: "Biología Celular", prereq: [] },
      { id: "zoo", nombre: "Zoología", prereq: [] },
      { id: "mate2", nombre: "Matemáticas II", prereq: ["mate1"] },
      { id: "quim2", nombre: "Química General II", prereq: ["quim1"] },
      { id: "fisica", nombre: "Introducción a la Mecánica", prereq: ["mate1"] },
      { id: "vegetal", nombre: "Biología Vegetal", prereq: [] },
      { id: "mate3", nombre: "Álgebra Lineal y Cálculo Vectorial", prereq: ["mate2"] },
      { id: "optica", nombre: "Óptica y Electromagnetismo", prereq: ["fisica"] },
      { id: "organica", nombre: "Química Orgánica", prereq: ["quim2"] },
      { id: "intro", nombre: "Introducción a la Ingeniería Genética", prereq: [] },
      { id: "Acui", nombre: "Acuicultura", prereq: [] },
      { id: "mate4", nombre: "Métodos y Aplicaciones de las Ecuaciones Diferenciales", prereq: ["mate3"] },
      { id: "bioq", nombre: "Bioquímica", prereq: ["bio1""organica"] },
      { id: "termo", nombre: "Termodinámica", prereq: ["quim2""optica""mate2"] },
      { id: "ingles1", nombre: "Inglés Cientifico I", prereq: [] },
      { id: "CFG1", nombre: "CFG I", prereq: [] },
      { id: "gene", nombre: "Genética", prereq: ["bioq"] },
      { id: "microbio", nombre: "Microbiología", prereq: ["bioq"] },
      { id: "bioesta", nombre: "Bioestadística", prereq: ["mate1"] },
      { id: "cine", nombre: "Cinética y Electroquímica", prereq: ["termo""mate4"] },
      { id: "bio_mol", nombre: "Biología Molecular", prereq: ["microbio""gene"] },
      { id: "fisio", nombre: "Fisioquímica Macromolecular", prereq: ["bioq""cine"] },
      { id: "tallerge", nombre: "Taller de Ingeniería Genética", prereq: ["gene"] },
      { id: "elec", nombre: "Electivo Especialidad o Unidad de Investigación Electiva", prereq: [] },
      { id: "CFG2", nombre: "CFG II", prereq: [] },
      { id: "biotec", nombre: "Biotecnología", prereq: ["bio_mol"] },
      { id: "instru", nombre: "Instrumentación", prereq: ["fisio"] },
      { id: "fisioge", nombre: "Fisiología General", prereq: ["bioq"] },
      { id: "eco", nombre: "Ecología Microbiana y Biotecnología Ambiental", prereq: ["gene"] },
      { id: "ingles2", nombre: "Inglés Cientifico II", prereq: ["ingles1"] },
      { id: "inmuno", nombre: "Inmonología", prereq: ["bio_mol"] },
      { id: "microeco", nombre: "Microeconomía", prereq: ["mate2"] },
      { id: "fisioveg", nombre: "Fisiología Vegetal", prereq: ["bio_mol"] },
      { id: "opti", nombre: "Optimización", prereq: ["mate4"] },
      { id: "bioet", nombre: "Bioética", prereq: ["gene"] },
      { id: "patente", nombre: "Patentes y Legislación", prereq: ["tallerge"] },
      { id: "microin", nombre: "Microbiología Industrial", prereq: ["microbio"] },
      { id: "biotecmed", nombre: "Biotecnología Médica", prereq: ["bio_mol"] },
      { id: "opera", nombre: "Operaciones Unitarias", prereq: ["opti"] },
      { id: "tallerbio", nombre: "Taller de Biotecnología Vegetal", prereq: ["fisioveg"] },
      { id: "Uni", nombre: "Unidad de Investigación de Seminario de Título", prereq: [] },
      { id: "eva", nombre: "Evaluación de Proyectos", prereq: [] },
      { id: "semi", nombre: "Seminario de Título", prereq: [] },
    ];

    const container = document.getElementById("malla");

    function crearRamo(ramo) {
      const div = document.createElement("div");
      div.className = "ramo";
      div.id = ramo.id;
      div.innerText = ramo.nombre;
      if (ramo.prereq.length === 0) {
        div.classList.add("activo");
        div.onclick = () => toggleAprobado(div, ramo.id);
      }
      container.appendChild(div);
    }

    function toggleAprobado(elemento, id) {
      elemento.classList.toggle("aprobado");
      actualizarDisponibilidad();
    }

    function actualizarDisponibilidad() {
      ramos.forEach(ramo => {
        const elem = document.getElementById(ramo.id);
        if (!elem.classList.contains("aprobado")) {
          const desbloquear = ramo.prereq.every(pre => {
            const preElem = document.getElementById(pre);
            return preElem && preElem.classList.contains("aprobado");
          });
          if (desbloquear && !elem.classList.contains("activo")) {
            elem.classList.add("activo");
            elem.onclick = () => toggleAprobado(elem, ramo.id);
            elem.style.cursor = "pointer";
          }
        }
      });
    }

    ramos.forEach(crearRamo);
  </script>
</body>
</html>

