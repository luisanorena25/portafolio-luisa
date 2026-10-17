// ===== ESCENA CINEMATOGRÁFICA + SCROLL CON INERCIA =====
(() => {
  // ===== TUS IMÁGENES (rutas corregidas) =====
  const DISENOS = [
    "img/fachada.jpeg",
    "img/hamburguesa.jpeg",
    "img/patio.jpg",
    "img/laminado.jpeg",
    "img/webinar.jpg"
  ];

  const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
  const hero = document.getElementById("inicio");
  const logoMenu = document.querySelector(".menu__logo");

  if (!hero || !logoMenu) {
    console.warn("[escena.js] Faltan nodos base del DOM. Abortando.");
    return;
  }

  // ===== LOGO ANIMADO (luna + estrella + destello) =====
  const EMBLEMA = `<svg viewBox="0 0 100 100" aria-hidden="true">
    <path class="emb-luna" pathLength="300" d="M64 12C36 14 18 34 18 56C18 78 38 92 62 90C42 82 34 66 38 48C42 30 52 18 64 12Z"/>
    <path class="emb-estrella" d="M70 30L73 41L84 44L73 47L70 58L67 47L56 44L67 41Z"/>
    <g class="emb-orbita"><circle cx="50" cy="5" r="2.6"/><circle cx="50" cy="95" r="1.8"/></g></svg>`;
  hero.insertAdjacentHTML("afterbegin", `<div class="emblema">${EMBLEMA}</div>`);
  logoMenu.insertAdjacentHTML("afterbegin", `<span class="emblema emblema--mini">${EMBLEMA}</span>`);

  // ===== AMBIENTE DEL INICIO =====
  hero.insertAdjacentHTML("afterbegin", '<div class="aurora"><i></i><i></i><i></i></div>');
  for (let i = 0; i < 26; i++) {
    const m = document.createElement("span");
    m.className = "mota";
    const t = 2 + Math.random() * 5;
    m.style.cssText = `left:${Math.random() * 100}%;width:${t}px;height:${t}px;` +
      `animation-duration:${8 + Math.random() * 10}s;animation-delay:${-Math.random() * 14}s`;
    hero.appendChild(m);
  }

  // ===== PARTIR TEXTO EN LETRAS =====
  function partirLetras(el) {
    const txt = el.textContent.trim();
    el.textContent = "";
    el.setAttribute("aria-label", txt);
    const chars = [];
    let i = 0;
    txt.split(" ").forEach((pal, w, arr) => {
      const p = document.createElement("span");
      p.className = "palabra";
      [...pal].forEach((ch) => {
        const s = document.createElement("span");
        s.className = "char";
        s.textContent = ch;
        s.style.setProperty("--i", i++);
        p.appendChild(s);
        chars.push(s);
      });
      el.appendChild(p);
      if (w < arr.length - 1) el.appendChild(document.createTextNode(" "));
    });
    return chars;
  }

  // ===== OBSERVER GENERAL =====
  const obs = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
  }), { threshold: 0.15 });

  // Aplica .sube a los hijos de cada sección EXCEPTO los marcados con data-skip-sube
  document.querySelectorAll(".seccion:not(.hero)").forEach((sec) => {
    [...sec.children].forEach((el, i) => {
      if (el.classList.contains("seccion__titulo")) {
        partirLetras(el);
        obs.observe(el);
      } else if (!el.hasAttribute("data-skip-sube")) {
        el.classList.add("sube");
        el.style.transitionDelay = i * 0.12 + "s";
        obs.observe(el);
      }
      // Los data-skip-sube (como .sobre) los maneja portafolio.js con su propia secuencia
    });
  });

  // ===== MENÚ: LETRAS QUE SE REVUELVEN =====
  const abc = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ✦";
  document.querySelectorAll(".menu__links a").forEach((a) => {
    const orig = a.textContent;
    a.addEventListener("pointerenter", () => {
      let f = 0;
      clearInterval(a._t);
      a._t = setInterval(() => {
        a.textContent = [...orig].map((ch, i) =>
          ch === " " || i < f / 2 ? ch : abc[Math.floor(Math.random() * abc.length)]).join("");
        if (++f > orig.length * 2) { clearInterval(a._t); a.textContent = orig; }
      }, 35);
    });
  });

  // ===== REJILLA 3D =====
  const vision = document.getElementById("vision");
  const rejilla = document.getElementById("rejilla");
  const fichas = [];
  for (let i = 0; i < 6; i++) {
    const f = document.createElement("div");
    f.className = "ficha";
    f.style.backgroundImage = i < DISENOS.length
      ? `url("${DISENOS[i]}"), linear-gradient(135deg, #5a2a6e, #e7b8a3)`
      : "linear-gradient(135deg, #e7b8a3, #c4a8ff)";
    rejilla.appendChild(f);
    fichas.push(f);
  }
  const letrasVision = [];
  vision.querySelectorAll(".vision__titulo span").forEach((l) => letrasVision.push(...partirLetras(l)));
  letrasVision.forEach((s) => (s.style.transition = "none"));

  // ===== SCROLL SUAVE CON INERCIA =====
  const max = () => document.documentElement.scrollHeight - innerHeight;
  let objetivo = scrollY, actual = scrollY;
  let ultimoScrollProg = 0;

  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    addEventListener("wheel", (e) => {
      if (e.ctrlKey) return;
      e.preventDefault();
      objetivo = clamp(objetivo + e.deltaY, 0, max());
    }, { passive: false });
  }

  addEventListener("scroll", () => {
    if (Date.now() - ultimoScrollProg < 100) return;
    if (Math.abs(scrollY - actual) > 3) objetivo = actual = scrollY;
  });

  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      const d = document.querySelector(a.getAttribute("href"));
      if (!d) return;
      e.preventDefault();
      objetivo = clamp(d.offsetTop, 0, max());
    }));

  // ===== BUCLE =====
  function cuadro() {
    requestAnimationFrame(cuadro);
    if (document.hidden) return;

    if (Math.abs(objetivo - actual) > 0.3) {
      actual += (objetivo - actual) * 0.09;
      ultimoScrollProg = Date.now();
      scrollTo(0, actual);
    }

    const h = clamp(scrollY / innerHeight);
    hero.style.transform = `translateY(${h * 120}px) scale(${1 - h * 0.08})`;
    hero.style.opacity = 1 - h * 1.1;

    const r = vision.getBoundingClientRect();
    const p = clamp(-r.top / (r.height - innerHeight));
    fichas.forEach((f, i) => {
      const q = clamp((p * 1.5 - i * 0.08) / 0.6);
      const e = 1 - Math.pow(1 - q, 3);
      f.style.transform = `perspective(1200px) rotateX(${-70 * (1 - e)}deg) translateY(${(1 - e) * 60}px)`;
      f.style.filter = `brightness(${0.6 + 0.6 * e})`;
    });
    const t = clamp((p - 0.45) / 0.45);
    rejilla.style.opacity = 1 - t * 0.5;
    letrasVision.forEach((s, k) => {
      const v = clamp(t * 1.9 - (k / letrasVision.length) * 0.9);
      s.style.opacity = v;
      s.style.filter = `blur(${(1 - v) * 20}px)`;
      s.style.transform = `scale(${0.8 + 0.2 * v})`;
    });
  }
  cuadro();

  // ===== EXPONER LO QUE PORTAFOLIO.JS NECESITA =====
  window.Luma = {
    clamp,
    max,
    obs,
    get objetivo() { return objetivo; },
    set objetivo(v) { objetivo = v; }
  };
})();