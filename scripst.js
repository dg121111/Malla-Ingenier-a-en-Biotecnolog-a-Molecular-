// script.js
<script>
    const ramosPorSemestre = [
      ["mate1", "quim1", "bio1", "zoo"],
      ["mate2", "quim2", "fisica", "vegetal"],
      ["mate3", "optica", "organica", "intro", "Acui"],
      ["mate4", "bioq", "termo", "ingles1", "CFG1"],
      ["gene", "microbio", "bioesta", "cine"],
      ["bio_mol", "fisio", "tallerge", "elec", "CFG2"],
      ["biotec", "instru", "fisioge", "eco"],
      ["inmuno", "microeco", "fisioveg", "opti", "ingles2", "bioet"],
      ["microin", "biotecmed", "opera", "tallerbio", "patente", "Uni"],
      ["eva", "semi"]
    ];

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
      { id: "mate4", nombre: "Ecuaciones Diferenciales", prereq: ["mate3"] },
      { id: "bioq", nombre: "Bioquímica", prereq: ["bio1", "organica"] },
      { id: "termo", nombre: "Termodinámica", prereq: ["quim2", "optica", "mate2"] },
      { id: "ingles1", nombre: "Inglés Científico I", prereq: [] },
      { id: "CFG1", nombre: "CFG I", prereq: [] },
      { id: "gene", nombre: "Genética", prereq: ["bioq"] },
      { id: "microbio", nombre: "Microbiología", prereq: ["bioq"] },
      { id: "bioesta", nombre: "Bioestadística", prereq: ["mate1"] },
      { id: "cine", nombre: "Cinética y Electroquímica", prereq: ["termo", "mate4"] },
      { id: "bio_mol", nombre: "Biología Molecular", prereq: ["microbio", "gene"] },
      { id: "fisio", nombre: "Fisioquímica Macromolecular", prereq: ["bioq", "cine"] },
      { id: "tallerge", nombre: "Taller Ingeniería Genética", prereq: ["gene"] },
      { id: "elec", nombre: "Electivo Especialidad", prereq: [] },
      { id: "CFG2", nombre: "CFG II", prereq: [] },
      { id: "biotec", nombre: "Biotecnología", prereq: ["bio_mol"] },
      { id: "instru", nombre: "Instrumentación", prereq: ["fisio"] },
      { id: "fisioge", nombre: "Fisiología General", prereq: ["bioq"] },
      { id: "eco", nombre: "Ecología Microbiana", prereq: ["gene"] },
      { id: "inmuno", nombre: "Inmunología", prereq: ["bio_mol"] },
      { id: "microeco", nombre: "Microeconomía", prereq: ["mate2"] },
      { id: "fisioveg", nombre: "Fisiología Vegetal", prereq: ["bio_mol"] },
      { id: "opti", nombre: "Optimización", prereq: ["mate4"] },
      { id: "ingles2", nombre: "Inglés Científico II", prereq: ["ingles1"] },
      { id: "bioet", nombre: "Bioética", prereq: ["gene"] },
      { id: "microin", nombre: "Microbiología Industrial", prereq: ["microbio"] },
      { id: "biotecmed", nombre: "Biotecnología Médica", prereq: ["bio_mol"] },
      { id: "opera", nombre: "Operaciones Unitarias", prereq: ["opti"] },
      { id: "tallerbio", nombre: "Taller Biotecnología Vegetal", prereq: ["fisioveg"] },
      { id: "patente", nombre: "Patentes y Legislación", prereq: ["tallerge"] },
      { id: "Uni", nombre: "Unidad de Investigación", prereq: [] },
      { id: "eva", nombre: "Evaluación de Proyectos", prereq: [] },
      { id: "semi", nombre: "Seminario de Título", prereq: [] },
    ];

    const container = document.getElementById("contenedor-malla");

    for (let i = 0; i < ramosPorSemestre.length; i += 2) {
      const anio = document.createElement("div");
      anio.className = "anio";

      const titulo = document.createElement("div");
      titulo.className = "anio-titulo";
      titulo.textContent = `${i / 2 + 1}º Año`;
      anio.appendChild(titulo);

      const fila = document.createElement("div");
      fila.className = "malla";

      for (let j = 0; j < 2; j++) {
        const idx = i + j;
        if (ramosPorSemestre[idx]) {
          const cont = document.createElement("div");
          cont.className = "semestre";

          const tituloSem = document.createElement("div");
          tituloSem.className = "titulo-semestre";
          tituloSem.textContent = `${idx + 1}º Semestre`;
          cont.appendChild(tituloSem);

          ramosPorSemestre[idx].forEach(id => {
            const ramo = ramos.find(r => r.id === id);
            const div = document.createElement("div");
            div.className = "ramo";
            div.id = ramo.id;
            div.innerText = ramo.nombre;
            if (ramo.prereq.length === 0) {
              div.classList.add("activo");
              div.onclick = () => toggleAprobado(div, ramo.id);
            }
            cont.appendChild(div);
          });
          fila.appendChild(cont);
        }
      }

      anio.appendChild(fila);
      container.appendChild(anio);
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
  </script>
</body>
</html>


