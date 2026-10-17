(() => {
  const { clamp, max, obs } = window.Luma || {};
  if (!clamp || !obs || !max) {
    console.error("[portafolio.js] Necesita a escena.js cargado antes.");
    return;
  }

  const EXT = ["jpg", "jpeg", "png", "webp"];

  // ===== EDITA AQUÍ TUS TEXTOS =====
  const ALIADOS = [
    { nombre: "DK Porcelanatos", archivos: ["dk porcelanatos", "dk-porcelanatos", "dk_porcelanatos", "dk"], claro: true,
      rol: "Diseñadora gráfica & Social Media", periodo: "Mayo 2024 – actualmente",
      texto: "Creación y gestión integral de contenido digital: diseño gráfico, fotografía, edición de video y Reels, redacción de copys, análisis de métricas y campañas de Meta Ads orientadas a ventas.",
      tags: ["Diseño gráfico", "Reels", "Meta Ads", "Copywriting"] },
    { nombre: "Pronavícola", archivos: ["Pronavicola", "pronavicola", "pronavícola"], claro: false,
      rol: "Diseñadora gráfica & Social Media", periodo: "Julio 2025 – actualmente",
      texto: "Comunicación digital de la marca: piezas gráficas y material corporativo, fotografías, videos y Reels, planificación de contenido, administración de Facebook e Instagram y actualización de contenido en WordPress.",
      tags: ["Material corporativo", "Redes sociales", "WordPress"] },
    { nombre: "La Bocana", archivos: ["la bocana", "la-bocana", "la_bocana", "labocana"], claro: true,
      rol: "Fotografía gastronómica y redes", periodo: "",
      texto: "Fotografía gastronómica y contenido para redes sociales de La Bocana: imágenes pensadas para que cada plato se vea tan antojable como sabe.",
      tags: ["Fotografía gastronómica", "Redes sociales"] },
    { nombre: "GB Cell", archivos: ["gb cell", "gb-cell", "gb_cell", "gbcell"], claro: true,
      rol: "Flyers promocionales y visuales para vitrina", periodo: "",
      texto: "Flyers promocionales y visuales para vitrina de GB Cell, diseñados para captar la atención de quienes pasan y comunicar cada oferta de forma clara.",
      tags: ["Flyers", "Visuales para vitrina"] }
  ];

  const PIEZAS = [
    { titulo: "Fachadas", marca: "DK Porcelanatos", archivos: ["fachadas", "fachada"],
      texto: "Pieza de revestimiento para fachadas: el producto en detalle junto a un ambiente real, con los datos de contacto a la vista.",
      tags: ["Diseño gráfico", "Redes sociales"] },
    { titulo: "Hamburguesa", marca: "Fotografía gastronómica", archivos: ["hamburguesa"],
      texto: "Fotografía de producto con luz cálida y fondo desenfocado para que el plato sea el protagonista.",
      tags: ["Fotografía", "Contenido"] },
    { titulo: "Patio", marca: "Porcelanato para exteriores", archivos: ["patio", "60x60_Atrio_Beige_300dpi"],
      texto: "Ambientación de piso en porcelanato beige para espacios exteriores.",
      tags: ["Ambientación", "Producto"] },
    { titulo: "Lámina marmolizada", marca: "DK Porcelanatos", archivos: ["laminado", "laminado-marmolizado"],
      texto: "Pieza de lujo para la lámina marmolizada de 1.22 x 2.44, con tipografía elegante y datos de contacto.",
      tags: ["Diseño gráfico", "Lujo"] },
    { titulo: "Webinar Pronavícola", marca: "Pronavícola", archivos: ["webinar", "Webinar_pagina_"],
      texto: "Pieza para promover las capacitaciones online del sector avícola.",
      tags: ["Diseño gráfico", "Capacitaciones"] },
    { titulo: "Flyer GB Cell", marca: "GB Cell", archivos: ["flyer gb cell", "flyer-gb-cell", "flyer_gb_cell", "flyer gbcell", "flyergbcell", "flyer"],
      texto: "Flyer promocional diseñado para GB Cell.",
      tags: ["Diseño gráfico", "Flyer"] }
  ];

  // ===== BUSCA LA IMAGEN PROBANDO NOMBRES Y EXTENSIONES =====
  function buscar(bases) {
    const lista = [];
    bases.forEach((b) => EXT.forEach((x) => lista.push(encodeURI(`img/${b}.${x}`))));
    return new Promise((res) => {
      let i = 0;
      const probar = () => {
        if (i >= lista.length) return res(null);
        const u = lista[i++], im = new Image();
        im.onload = () => res(u);
        im.onerror = probar;
        im.src = u;
      };
      probar();
    });
  }

  // ============================================================
  // ===== FOTO "SOBRE MÍ" =====
  // ============================================================
  const fotoEl = document.getElementById("fotoLuisa");
  if (fotoEl) {
    const rutas = [
      "img/luisa.png", "img/luisa.png.png",
      "img/luisa.jpg", "img/luisa.jpeg", "img/luisa.webp",
      "img/Luisa.png", "img/Luisa.jpg",
      "img/luisa-norena.png", "img/luisa-norena.jpg",
      "img/sobre-mi.png", "img/sobre-mi.jpg",
      "img/perfil.png", "img/perfil.jpg",
      "img/yo.png", "img/yo.jpg",
      "luisa.png", "luisa.jpg"
    ];

    let idx = 0;
    const intentar = () => {
      if (idx >= rutas.length) {
        console.warn("[portafolio.js] ❌ No se encontró la foto. Probé:\n" + rutas.join("\n"));
        const ph = document.createElement("div");
        ph.className = "sobre__placeholder";
        ph.textContent = "LN";
        fotoEl.replaceWith(ph);
        return;
      }
      const ruta = rutas[idx++];
      fotoEl.onerror = () => intentar();
      fotoEl.onload = () => console.log("%c[portafolio.js] ✅ Foto cargada:", "color:#22c55e", ruta);
      fotoEl.src = ruta;
    };
    intentar();
  }

  // ============================================================
  // ===== REVELACIÓN MÁGICA DE "SOBRE MÍ" =====
  // ============================================================
  const sobre = document.getElementById("sobre");
  if (sobre) {
    sobre.classList.add("animar");

    const revelar = () => {
      if (sobre.classList.contains("visible")) return;
      sobre.classList.add("visible");
    };

    if ("IntersectionObserver" in window) {
      const obsSobre = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (e.isIntersecting) { revelar(); obsSobre.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -10% 0px" });
      obsSobre.observe(sobre);
    }

    const chequear = () => {
      if (sobre.classList.contains("visible")) {
        removeEventListener("scroll", chequear);
        return;
      }
      const r = sobre.getBoundingClientRect();
      if (r.top < innerHeight * 0.9 && r.bottom > 0) revelar();
    };
    addEventListener("scroll", chequear, { passive: true });
    setTimeout(chequear, 100);
    setTimeout(chequear, 800);
    setTimeout(chequear, 2000);
  }

  // ============================================================
  // ===== FORMULARIO DE CONTACTO =====
  // Envía los datos por WhatsApp con un mensaje pre-armado.
  // ============================================================
  const form = document.getElementById("formContacto");
  const aviso = document.getElementById("avisoForm");
  const WHATSAPP = "573172859988"; // +57 317 285 9988 (sin +, sin espacios)

  function mostrarAviso(texto, tipo) {
    if (!aviso) return;
    aviso.textContent = texto;
    aviso.className = "contacto__aviso " + tipo;
    aviso.hidden = false;
    clearTimeout(aviso._t);
    aviso._t = setTimeout(() => { aviso.hidden = true; }, 6500);
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre   = form.nombre.value.trim();
      const telefono = form.telefono.value.trim();
      const correo   = form.correo.value.trim();

      if (!nombre || nombre.length < 2) {
        mostrarAviso("Por favor escribe tu nombre completo.", "err");
        form.nombre.focus();
        return;
      }
      if (!telefono || telefono.replace(/\D/g, "").length < 7) {
        mostrarAviso("Ingresa un número de teléfono válido (con el código de tu país).", "err");
        form.telefono.focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        mostrarAviso("Ingresa un correo electrónico válido.", "err");
        form.correo.focus();
        return;
      }

      const mensaje =
        "Hola Luisa ✨\n\n" +
        "Mi nombre es " + nombre + "\n" +
        "Teléfono: " + telefono + "\n" +
        "Correo: " + correo + "\n\n" +
        "Vi tu portafolio y me gustaría hablar contigo sobre un proyecto.";

      const url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensaje);
      window.open(url, "_blank", "noopener");

      mostrarAviso("¡Listo! Abriendo WhatsApp para enviar tu mensaje ✨", "ok");
      form.reset();
    });

    // Pequeña mejora: al salir de cada campo, si tiene error, se marca
    form.querySelectorAll("input").forEach((inp) => {
      inp.addEventListener("blur", () => {
        if (inp.value.trim()) inp.dataset.touched = "1";
      });
    });
  }

  // ===== TARJETA QUE SE INCLINA EN 3D =====
  function inclinar(el) {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.transform = `perspective(700px) rotateX(${(0.5 - y) * 14}deg) rotateY(${(x - 0.5) * 14}deg) translateY(-6px)`;
      el.style.setProperty("--mx", x * 100 + "%");
      el.style.setProperty("--my", y * 100 + "%");
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  }

  // ===== TARJETAS =====
  function celdaAliado(a, i) {
    const celda = document.createElement("div");
    celda.innerHTML = `<button class="tarjeta" data-aliado="${i}">
      <span class="logo${a.claro ? " logo--claro" : ""}">${a.nombre.split(" ").map((p) => p[0]).join("").slice(0, 2)}</span>
      <h3>${a.nombre}</h3><p>${a.rol}</p><span class="pista">Ver magia ✨</span></button>`;
    buscar(a.archivos).then((u) => {
      a.url = u;
      if (u) celda.querySelector(".logo").innerHTML = `<img src="${u}" alt="Logo de ${a.nombre}">`;
    });
    return celda;
  }

  function celdaPieza(p, i) {
    const celda = document.createElement("div");
    celda.innerHTML = `<button class="tarjeta tarjeta--pieza" data-pieza="${i}"><span class="foto"></span>
      <span class="pie"><b>${p.titulo}</b><small>${p.marca}</small></span></button>`;
    const foto = celda.querySelector(".foto");
    foto.style.backgroundImage = "linear-gradient(135deg, #5a2a6e, #e7b8a3)";
    buscar(p.archivos).then((u) => {
      p.url = u;
      if (!u) return;
      foto.style.backgroundImage = `url("${u}")`;
      const ficha = document.querySelectorAll(".ficha")[i];
      if (ficha) ficha.style.backgroundImage = `url("${u}")`;
    });
    return celda;
  }

  function llenar(id, subtitulo, items, fabrica) {
    const sec = document.getElementById(id);
    if (!sec) return;
    sec.querySelector("p").textContent = subtitulo;
    const rej = document.createElement("div");
    rej.className = "rejilla-tarjetas";
    items.forEach((it, i) => {
      const celda = fabrica(it, i);
      celda.classList.add("sube");
      celda.style.transitionDelay = 0.2 + i * 0.12 + "s";
      inclinar(celda.firstElementChild);
      rej.appendChild(celda);
      obs.observe(celda);
    });
    sec.appendChild(rej);
  }

  llenar("aliados", "Diseños que conectan, fotos que comunican, marcas que inspiran. Estas alianzas no solo embellecen mi portafolio, ¡le dan vida a cada proyecto!", ALIADOS, celdaAliado);
  llenar("disenos", "Toca una pieza para verla de cerca.", PIEZAS, celdaPieza);

  // ===== POPUP DE CRISTAL =====
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `<div class="modal__caja" role="dialog" aria-modal="true" aria-labelledby="modalTitulo">
    <button class="modal__x" data-cerrar aria-label="Cerrar">✕</button><div id="modalCuerpo"></div></div>`;
  document.body.appendChild(modal);
  const cuerpo = modal.querySelector("#modalCuerpo");
  const caja = modal.querySelector(".modal__caja");
  let abierto = false, indicePieza = 0, focoPrevio = null;

  const etiquetas = (t) => `<div class="etiquetas">${t.map((x) => `<span>${x}</span>`).join("")}</div>`;

  function abrir(html) {
    focoPrevio = document.activeElement;
    cuerpo.innerHTML = html;
    modal.classList.add("abierto");
    abierto = true;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      const f = caja.querySelector("button, [href], input, [tabindex]:not([tabindex='-1'])");
      if (f) f.focus();
    });
  }

  function cerrar() {
    modal.classList.remove("abierto");
    abierto = false;
    document.body.style.overflow = "";
    if (focoPrevio && focoPrevio.focus) focoPrevio.focus();
  }

  function verAliado(i) {
    const a = ALIADOS[i];
    const logo = a.url ? `<img src="${a.url}" alt="Logo de ${a.nombre}">` : a.nombre[0];
    abrir(`<div class="det">
      <span class="logo logo--grande${a.claro ? " logo--claro" : ""}">${logo}</span>
      <div><h3 id="modalTitulo">${a.nombre}</h3>
      <p class="det__meta">${a.rol}${a.periodo ? " · " + a.periodo : ""}</p>
      <p>${a.texto}</p>${etiquetas(a.tags)}
      <div class="acciones">
        <button class="boton" data-ir>Ver mis diseños ✨</button>
        <button class="boton boton--suave" data-cerrar>Cerrar vista previa</button>
      </div></div></div>`);
  }

  function verPieza(i) {
    indicePieza = (i + PIEZAS.length) % PIEZAS.length;
    const p = PIEZAS[indicePieza];
    const foto = p.url ? `<img src="${p.url}" alt="${p.titulo}">` : `<div class="sinfoto"></div>`;
    abrir(`<div class="det det--pieza">${foto}
      <div><h3 id="modalTitulo">${p.titulo}</h3><p class="det__meta">${p.marca}</p>
      <p>${p.texto}</p>${etiquetas(p.tags)}
      <div class="acciones">
        <button class="boton boton--suave" data-nav="-1">← Anterior</button>
        <button class="boton boton--suave" data-nav="1">Siguiente →</button>
        <button class="boton" data-cerrar>Cerrar vista previa</button>
      </div></div></div>`);
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-aliado]");
    if (a) verAliado(+a.dataset.aliado);
    const p = e.target.closest("[data-pieza]");
    if (p) verPieza(+p.dataset.pieza);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-cerrar]")) cerrar();
    const nav = e.target.closest("[data-nav]");
    if (nav) verPieza(indicePieza + Number(nav.dataset.nav));
    if (e.target.closest("[data-ir]")) {
      cerrar();
      window.Luma.objetivo = clamp(document.getElementById("disenos").offsetTop, 0, max());
    }
  });

  addEventListener("keydown", (e) => {
    if (!abierto) return;
    if (e.key === "Escape") { cerrar(); return; }
    if (e.key === "Tab") {
      const focusables = [...caja.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      )].filter((el) => !el.disabled && el.offsetParent !== null);
      if (!focusables.length) return;
      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
    if (cuerpo.querySelector(".det--pieza")) {
      if (e.key === "ArrowRight") verPieza(indicePieza + 1);
      if (e.key === "ArrowLeft") verPieza(indicePieza - 1);
    }
  });

  addEventListener("wheel", (e) => {
    if (!abierto) return;
    e.stopImmediatePropagation();
    if (!e.target.closest(".modal__caja")) e.preventDefault();
  }, { capture: true, passive: false });
})();