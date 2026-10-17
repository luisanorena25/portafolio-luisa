<div align="center">

# ✨ Luma Design

### Portafolio de Luisa M. Noreña

**Diseño gráfico · Social Media · Marketing Digital · Fotografía**

Donde las ideas se convierten en magia visual 🪄

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)

</div>

---

## 🌙 Sobre el proyecto

Sitio web de portafolio personal para **Luisa M. Noreña**, diseñadora visual, desarrolladora de software en formación, especialista en marketing digital y repostera. La página está construida como una experiencia **de una sola página** con una estética "mágica/cósmica": cielo estrellado animado, aurora de colores, cursor en forma de varita mágica, y transiciones cinematográficas.

El objetivo es presentar visualmente la marca personal **Luma Design**, mostrar los aliados y las piezas de diseño, contar la historia de Luisa y facilitar el contacto directo vía WhatsApp o correo.

---

## ✨ Características

- 🎨 **Diseño mágico/cósmico** con aurora de colores y partículas flotantes
- 🌌 **Cielo estrellado animado** en canvas (con parallax al mover el mouse)
- 🪄 **Cursor de varita mágica** con chispas y ondas al hacer clic
- 🎬 **Hero cinematográfico** con título que reacciona al puntero (letra por letra)
- 🎠 **Sección 3D interactiva** con scroll (rejilla de imágenes que se voltean)
- 💎 **Tarjetas glassmorphism** con efecto de inclinación 3D
- 🖼️ **Modal de cristal** con navegación por teclado (Esc, ←, →) y focus trap
- 📱 **100% responsive** (se adapta a móvil y tablet)
- ♿ **Accesible** — respeta `prefers-reduced-motion`, ARIA labels, navegación por teclado
- 📩 **Formulario de contacto** que envía los datos directo a WhatsApp (sin backend)
- 🎭 **Animaciones escalonadas** para "Sobre mí" (texto → foto con destello mágico)
- 🚀 **Sin dependencias** — HTML, CSS y JavaScript puro (vanilla)

---

## 🛠️ Tecnologías

| Capa | Tecnología |
|---|---|
| **Estructura** | HTML5 semántico |
| **Estilos** | CSS3 (Variables, Grid, Flexbox, Animations, Backdrop-filter) |
| **Lógica** | JavaScript ES6+ (Canvas API, IntersectionObserver, SVG Filters) |
| **Fuentes** | Palatino Linotype, Trebuchet MS (del sistema, sin dependencias externas) |
| **Build** | Ninguno (sitio estático listo para abrir en el navegador) |

---

## 📁 Estructura del proyecto

```
luma-design/
│
├── index.html              # Página principal
│
├── css/
│   ├── style.css           # Estilos base, colores, tipografías
│   ├── magia.css           # Cursor varita, portal, barra de progreso
│   ├── escena.css          # Aurora, logo animado, rejilla 3D
│   └── portafolio.css      # Tarjetas, modal, sobre mí, contacto
│
├── js/
│   ├── main.js             # Canvas del cielo estrellado
│   ├── magia.js            # Cursor varita, chispas, título vivo
│   ├── escena.js           # Scroll con inercia, rejilla 3D, letras
│   └── portafolio.js       # Datos, tarjetas, modal, formulario
│
└── img/
    ├── luisa.png           # Foto personal
    ├── fachada.jpeg
    ├── hamburguesa.jpeg
    ├── patio.jpg
    ├── laminado.jpeg
    ├── webinar.jpg
    ├── dk porcelanatos.png
    ├── flyer gb cell.jpg
    ├── gb cell.png
    ├── la bocana.png
    └── Pronavicola.png
```

---

## 🚀 Uso local

Al ser un sitio estático, no necesitas instalar nada.

### Opción 1 — Abrir directo
Haz doble clic en `index.html` y se abrirá en tu navegador.

### Opción 2 — Servidor local (recomendado)
Para que funcione igual que en producción (rutas de imágenes, etc.), usa un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# O con Node.js (si tienes npx)
npx serve .

# O con VS Code Live Server (extensión)
# clic derecho en index.html → "Open with Live Server"
```

Luego abre `http://localhost:8000` en tu navegador.

---

## 🌐 Despliegue en GitHub Pages

1. Sube este repositorio a GitHub.
2. Ve a **Settings → Pages**.
3. En **Source**, selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda. Tu sitio estará disponible en:
   ```
   https://<tu-usuario>.github.io/<nombre-repo>/
   ```

> 💡 Consejo: si las imágenes con espacios (`dk porcelanatos.png`) dan problemas en producción, renómbralas sin espacios y actualiza las referencias en `js/portafolio.js` y `index.html`.

---

## 📝 Cómo personalizar

### 🎨 Colores y fuentes
Todos los colores están en un solo lugar — `css/style.css`:

```css
:root {
  --noche: #140d2b;
  --noche-2: #231445;
  --ciruela: #3b1f5e;
  --rosa: #f3a7c3;
  --oro-rosado: #e7b8a3;
  --oro: #e2c283;
  --lila: #c4a8ff;
  --crema: #fbf1e3;
}
```
Cambia uno y se actualiza toda la web.

### 💼 Agregar aliados o piezas
Edita los arrays `ALIADOS` o `PIEZAS` al inicio de `js/portafolio.js`:

```js
const ALIADOS = [
  {
    nombre: "Nombre de la marca",
    archivos: ["nombre-archivo", "otro-nombre"],  // busca img/nombre-archivo.jpg, .png, etc.
    claro: true,                                  // true si el logo es oscuro
    rol: "Tu rol en la marca",
    periodo: "Mes Año – Mes Año",
    texto: "Descripción de lo que hiciste.",
    tags: ["Tag 1", "Tag 2"]
  },
  // ...
];
```

### 📸 Foto "Sobre mí"
Coloca tu foto en `img/` con el nombre `luisa.png` (o `.jpg`, `.jpeg`, `.webp`). El código la busca automáticamente.

### 📞 Datos de contacto
En `index.html`:
- `mailto:` → tu correo
- `tel:` → tu teléfono
- `wa.me/<numero>` → tu WhatsApp (formato: código país + número, sin `+` ni espacios)

En `js/portafolio.js`:
```js
const WHATSAPP = "573172859988"; // <-- tu número
```

---

## 📱 Secciones de la página

| Sección | Descripción |
|---|---|
| **Inicio** | Hero con título animado, aurora, partículas y llamada a la acción |
| **Visión** | Rejilla 3D que se voltea al hacer scroll + título letra por letra |
| **Aliados de Estilo** | Tarjetas de marcas con las que ha trabajado |
| **Diseños** | Galería de piezas gráficas y fotográficas con modal ampliado |
| **Sobre mí** | Historia personal con foto y tags (se revelan con magia al scroll) |
| **Trabajemos juntos** | Formulario de contacto + datos directos (WhatsApp, correo, teléfono) |

---

## 📬 Contacto

<div align="center">

**Luisa M. Noreña — Luma Design**

[![Correo](https://img.shields.io/badge/Correo-luisa.norena2511@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:luisa.norena2511@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-+57_317_285_9988-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/573172859988)

</div>

---

## 📄 Licencia

Este proyecto es de uso personal y portafolio. Todos los derechos reservados © 2026 **Luisa M. Noreña**.

El contenido visual (imágenes, textos, marca "Luma Design") es propiedad de Luisa M. Noreña. Por favor **no reutilices las imágenes ni el contenido** sin autorización.

El código puede ser consultado con fines educativos.

---

<div align="center">

Hecho con 💜 y mucha magia ✨

</div>