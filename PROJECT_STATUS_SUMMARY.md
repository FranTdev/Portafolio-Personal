# Resumen de Estado del Proyecto: Portafolio "Dual Profile" (Astro + React)

Este documento resume la arquitectura y los cambios implementados para lograr una separación estricta entre los dos perfiles profesionales del usuario: **Data/Backend (Core)** y **Game Dev (Creative Lab)**.

## 1. Contexto Tecnológico
*   **Framework Principal:** Astro (para rendimiento y estructura de páginas).
*   **Interactividad:** React (componentes "islas" hidratados con `client:load`).
*   **Estilos:** TailwindCSS v4 + CSS Variables para fuentes personalizadas (Inter, JetBrains Mono).
*   **Datos:** JSON estático (`src/data/portfolio.json`).

## 2. Estrategia de Separación de Perfiles
El objetivo era mostrar por defecto un perfil "Corporativo/Data" y permitir cambiar a un perfil "Creativo/Game Dev" sin mezclar contenidos.

### A. Estructura de Datos (`portfolio.json`)
Se estandarizaron los objetos de proyecto agregando la propiedad `domain`:
```json
{
  "type": "project",
  "domain": "data", // o "game"
  "title": "...",
  "tech": ["Python", "SQL"]
  // ...
}
```
Esto permite filtrar estrictamente qué items se renderizan según el estado activo.

### B. Lógica de UI (`PortfolioManager.jsx`)
Se creó un "cerebro" central en React que reemplaza al antiguo grid estático.
*   **Estado:** `const [viewMode, setViewMode] = useState('data');`
*   **Comportamiento Dinámico:**
    *   **Filtrado:** Selecciona proyectos donde `item.domain === viewMode`.
    *   **Hero Section:** Cambia textos, títulos y gradientes (Azul/Cyan para Data, Púrpura/Rosa para Game Dev) instantáneamente.
    *   **Botón de Toggle:** Un switch visual "Professional Core" vs "Game Dev Lab".

## 3. Componentes Implementados

| Componente | Tipo | Función |
| :--- | :--- | :--- |
| `pages/index.astro` | Astro | Contenedor principal. Carga `<PortfolioManager client:load />`. |
| `PortfolioManager.jsx` | React | Gestor de estado y layout principal (Grid 4x4). Orquesta la vista. |
| `ProjectCard.jsx` | React | Tarjeta de proyecto. Recibe props y adapta sus colores según el dominio. |
| `KnowledgeCard.jsx` | React | Tarjeta de conocimientos teóricos (siempre visible o condicional). |
| `TechStack.jsx` | React | Grid visual de herramientas (Python, Unity, React, etc.). Estático interactivo. |
| `BentoGrid.astro` | Astro | **(Deprecado/Legacy)** Anterior grid estático, reemplazado por la versión React. |

## 4. Flujo de Usuario
1.  **Carga Inicial:** El usuario ve el perfil de **Data Analyst**. Título sobrio, proyectos de Python/SQL.
2.  **Interacción:** El usuario hace clic en el botón "Game Dev Lab 🎮".
3.  **Transición:**
    *   El Hero cambia a "Game Developer & Unity Specialist".
    *   Los proyectos de Data desaparecen y aparecen los de Unity/C#.
    *   El tema visual pasa de azul corporativo a un gradiente "gamer" neón.

## 5. Próximos Pasos Sugeridos
*   Agregar más proyectos al `portfolio.json` para llenar el grid en ambos modos.
*   Refinar las animaciones de entrada/salida al cambiar de modo (actualmente es un re-render reactivo).
*   Asegurar que la vista móvil del botón de toggle sea accesible y clara.
