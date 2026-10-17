// ===== LIENZO DE MAGIA Y VARITA =====
(() => {
  // El puntero siempre se expone (lo usa main.js), incluso en reduced-motion
  window.puntero = { x: -9999, y: -9999 };

  // Si el usuario pidió menos movimiento, no montamos nada
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const colores = ["#fbf1e3", "#e2c283", "#f3a7c3", "#c4a8ff"];
  const chispas = [], ondas = [];
  let ang = 0, angObj = 0, esc = 0, escObj = 0;

  const lienzo = document.createElement("canvas");
  lienzo.id = "magia";
  document.body.appendChild(lienzo);
  const c = lienzo.getContext("2d");
  function medir() { lienzo.width = innerWidth; lienzo.height = innerHeight; }
  medir();
  addEventListener("resize", medir);

  const varita = document.createElement("div");
  varita.className = "varita";
  varita.innerHTML = `<svg width="56" height="56" style="overflow:visible">
    <line x1="8" y1="8" x2="50" y2="50" stroke="#7a4a3a" stroke-width="5" stroke-linecap="round"/>
    <line x1="8" y1="8" x2="30" y2="30" stroke="#e7b8a3" stroke-width="5" stroke-linecap="round"/>
    <path d="M8 -2 L10 6 L18 8 L10 10 L8 18 L6 10 L-2 8 L6 6Z" fill="#fff6d6"/></svg>`;
  document.body.appendChild(varita);

  function chispa(x, y, v, vida) {
    const a = Math.random() * 6.283, s = (Math.random() * 1.5 + 0.3) * v;
    chispas.push({
      x, y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s + 0.2,
      vida, max: vida,
      r: Math.random() * 4 + 2,
      col: colores[Math.floor(Math.random() * 4)]
    });
  }
  function estrella(x, y, r) {
    c.beginPath(); c.moveTo(x, y - r);
    c.quadraticCurveTo(x, y, x + r, y); c.quadraticCurveTo(x, y, x, y + r);
    c.quadraticCurveTo(x, y, x - r, y); c.quadraticCurveTo(x, y, x, y - r);
    c.fill();
  }

  addEventListener("pointermove", (e) => {
    angObj = Math.max(-30, Math.min(30, (e.clientX - puntero.x) * 1.5));
    puntero.x = e.clientX; puntero.y = e.clientY;
    chispa(puntero.x, puntero.y, 0.6, 30);
    if (Math.random() < 0.5) chispa(puntero.x, puntero.y, 0.6, 30);
    varita.classList.toggle("activa", !!e.target.closest("a, button"));
    reaccionar();
  });

  addEventListener("pointerdown", (e) => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => ondas.push({ x: e.clientX, y: e.clientY, r: 4, v: 3 + i * 1.5, a: 1, col: colores[i + 1] }), i * 120);
    }
    for (let i = 0; i < 26; i++) chispa(e.clientX, e.clientY, 3, 50);
  });

  document.documentElement.addEventListener("mouseleave", () => {
    puntero.x = puntero.y = -9999; reaccionar();
  });

  // ===== TÍTULO VIVO =====
  const titulo = document.getElementById("titulo");
  const texto = titulo.textContent.trim();
  titulo.setAttribute("aria-label", texto);
  titulo.textContent = "";
  [...texto].forEach((ch, i) => {
    const s = document.createElement("span");
    s.className = "letra" + (i >= 5 ? " letra--b" : "");
    s.textContent = ch === " " ? "\u00A0" : ch;
    titulo.appendChild(s);
  });
  const letras = titulo.querySelectorAll(".letra");

  function reaccionar() {
    const t = titulo.getBoundingClientRect();
    letras.forEach((l) => {
      const cx = t.left + l.offsetLeft + l.offsetWidth / 2;
      const cy = t.top + l.offsetTop + l.offsetHeight / 2;
      const f = Math.max(0, 1 - Math.hypot(puntero.x - cx, puntero.y - cy) / 160);
      const tono = 300 + f * 120;
      l.style.transform = f > 0.02
        ? `translateY(${-f * 22}px) scale(${1 + f * 0.4}) rotate(${(puntero.x < cx ? -12 : 12) * f}deg)` : "";
      l.style.color = f > 0.05 ? `hsl(${tono}, 95%, ${78 - f * 8}%)` : "";
      l.style.textShadow = f > 0.05 ? `0 0 ${f * 30}px hsl(${tono}, 100%, 70%)` : "";
    });
  }

  // Filtro de agua que distorsiona el título
  document.body.insertAdjacentHTML("beforeend",
    `<svg width="0" height="0" style="position:absolute"><filter id="ondas" x="-20%" y="-50%" width="140%" height="200%">
    <feTurbulence id="turb" type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" result="r"/>
    <feDisplacementMap id="desplaza" in="SourceGraphic" in2="r" scale="0"/></filter></svg>`);
  const turb = document.getElementById("turb");
  const desplaza = document.getElementById("desplaza");
  titulo.addEventListener("pointerenter", () => (escObj = 28));
  titulo.addEventListener("pointerleave", () => (escObj = 0));

  // ===== BUCLE DE ANIMACIÓN =====
  function animar(t) {
    requestAnimationFrame(animar);
    if (document.hidden) return;

    c.clearRect(0, 0, lienzo.width, lienzo.height);
    c.globalCompositeOperation = "lighter";

    for (let i = chispas.length - 1; i >= 0; i--) {
      const p = chispas[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.vida--;
      if (p.vida <= 0) { chispas.splice(i, 1); continue; }
      c.globalAlpha = p.vida / p.max;
      c.fillStyle = p.col;
      estrella(p.x, p.y, p.r * (p.vida / p.max + 0.3));
    }
    for (let i = ondas.length - 1; i >= 0; i--) {
      const o = ondas[i];
      o.r += o.v; o.a -= 0.02;
      if (o.a <= 0) { ondas.splice(i, 1); continue; }
      c.globalAlpha = o.a; c.strokeStyle = o.col; c.lineWidth = 2;
      c.beginPath(); c.arc(o.x, o.y, o.r, 0, 6.283); c.stroke();
    }
    c.globalAlpha = 1;
    c.globalCompositeOperation = "source-over";

    ang += (angObj - ang) * 0.15; angObj *= 0.9;
    varita.style.transform = `translate(${puntero.x - 8}px, ${puntero.y - 8}px) rotate(${ang}deg)`;

    esc += (escObj - esc) * 0.12;
    desplaza.setAttribute("scale", esc.toFixed(1));
    turb.setAttribute("baseFrequency", `0.012 ${(0.03 + Math.sin(t / 400) * 0.01).toFixed(4)}`);
    titulo.style.filter = esc > 0.3 ? "url(#ondas)" : "none";
  }
  requestAnimationFrame(animar);
})();