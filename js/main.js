// ========== CIELO MÁGICO: estrellas que titilan ==========
const canvas = document.getElementById("cielo");
const ctx = canvas.getContext("2d");
let estrellas = [];

const coloresEstrella = ["#fbf1e3", "#e2c283", "#f3a7c3", "#c4a8ff"];

function crearEstrellas() {
  estrellas = [];
  const cantidad = Math.floor((canvas.width * canvas.height) / 9000);

  for (let i = 0; i < cantidad; i++) {
    estrellas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radio: Math.random() * 1.6 + 0.3,
      fase: Math.random() * Math.PI * 2,
      velocidad: Math.random() * 0.02 + 0.005,
      color: coloresEstrella[Math.floor(Math.random() * coloresEstrella.length)]
    });
  }
}

function ajustarCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  crearEstrellas();
}

function dibujarCielo() {
  requestAnimationFrame(dibujarCielo);

  // Si la pestaña no está visible, no gastamos CPU
  if (document.hidden) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const p = window.puntero || { x: -9999, y: -9999 };
  const mx = (p.x - canvas.width / 2) * 0.01;
  const my = (p.y - canvas.height / 2) * 0.01;

  for (const e of estrellas) {
    e.fase += e.velocidad;
    const brillo = (Math.sin(e.fase) + 1) / 2;
    const x = e.x - mx * e.radio * 1.5;
    const y = e.y - my * e.radio * 1.5;
    const cerca = Math.max(0, 1 - Math.hypot(p.x - x, p.y - y) / 140);
    ctx.globalAlpha = Math.min(1, 0.25 + brillo * 0.75 + cerca);
    ctx.fillStyle = e.color;
    ctx.beginPath();
    ctx.arc(x, y, e.radio + cerca * 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

window.addEventListener("resize", ajustarCanvas);
ajustarCanvas();
dibujarCielo();