# Portafolio Marca Personal

¡Bienvenido al repositorio de mi portafolio personal! Este proyecto es una Single Page Application construida con [Astro](https://astro.build/) y [React](https://reactjs.org/), diseñada con Tailwind CSS. Muestra mi "Núcleo Profesional" enfocado en Datos, Backend e Infraestructura, así como mi "Laboratorio de Juegos", destacando mis habilidades de desarrollo.

## 🚀 Tecnologías Principales

- **Framework:** Astro + React
- **Estilos:** Tailwind CSS
- **Iconos:** react-icons (Simple Icons, FontAwesome, Devicons)
- **Datos:** JSON local para fácil actualización y mantenimiento.

## 📦 Estructura del Proyecto

- `src/components/`: Componentes interactivos de React (Tarjetas, Gestor del portafolio, Modales).
- `src/data/`: `portfolio.json`, donde se almacenan todos los datos, proyectos, habilidades e idiomas (Inglés/Español).
- `src/layouts/`: Plantilla base de Astro.
- `src/pages/`: Páginas y rutas estáticas.
- `public/`: Recursos estáticos (documentos, imágenes).

## 🛠️ Desarrollo Local

1. Asegúrate de tener Node.js instalado.
2. Clona el repositorio e instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
4. Abre tu navegador en `http://localhost:4321`.

---

## 🌐 Cómo desplegar en GitHub Pages

Dado que este proyecto está construido con Astro y produce un sitio web completamente estático, la forma más sencilla y automatizada de desplegarlo en **GitHub Pages** es utilizando **GitHub Actions**.

### Paso 1: Configurar el archivo `astro.config.mjs`

Asegúrate de que tu `astro.config.mjs` tenga configurado el parámetro `site` y `base` (si tu repositorio no se llama de la forma `usuario.github.io`).

Ejemplo si tu repositorio se llama `Portafolio_MarcaPersonal`:
```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tu-usuario-de-github.github.io',
  base: '/Portafolio_MarcaPersonal', // IMPORTANTE: El nombre de tu repositorio
});
```
*(Si lo despliegas como un repositorio `.github.io` en la raíz, elimina el `base`).*

### Paso 2: Crear el flujo de trabajo de GitHub Action

1. En tu repositorio dentro de GitHub, ve a la pestaña **Settings** (Configuración) > **Pages** (Páginas).
2. Bajo "Build and deployment", cambia la "Source" a **GitHub Actions**.
3. GitHub debería ofrecerte la plantilla de "Astro" por defecto. Si no es así, crea un archivo en tu código local en la siguiente ruta exacta: `.github/workflows/deploy.yml` y pega esto:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ] # o master
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v4
      - name: Install, build, and upload your site
        uses: withastro/action@v2

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Paso 3: Haz Commit y Push

```bash
git add .
git commit -m "Configurar despliegue a GitHub Pages"
git push origin main
```

