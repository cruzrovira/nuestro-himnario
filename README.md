# Nuestro Himnario

Aplicación web para consultar letras de himnos cristianos, con búsqueda por título o número de página y vista individual por canto.

## Características

- Listado de cantos con paginación.
- Búsqueda por nombre o página.
- Ruta dinámica por himno (`/himno/[slug]`).
- Soporte de tema claro/oscuro.
- Contenido gestionado desde archivos Markdown.

## Tecnologías

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- gray-matter
- react-markdown

## Requisitos

- Node.js 20+
- pnpm (recomendado)

## Instalación

```bash
pnpm install
```

## Scripts disponibles

```bash
pnpm dev      # entorno de desarrollo
pnpm build    # compilación de producción
pnpm start    # ejecutar build en producción
pnpm lint     # análisis estático con ESLint
```

Luego abre `http://localhost:3000`.

## Estructura del contenido

Los himnos viven en `content/hymns/*.md`.

Cada archivo usa frontmatter:

```md
---
title: "A Jesucristo Ven Sin Tardar"
page: 17
---

## A JESUCRISTO VEN SIN TARDAR

## I

Texto del himno...
```

Campos soportados:

- `title` (string, requerido): título que se muestra en listados y metadatos.
- `page` (number, opcional): número de página del himnario impreso.

El `slug` se obtiene del nombre del archivo. Ejemplo:

- Archivo: `a-jesucristo-ven-sin-tardar.md`
- URL: `/himno/a-jesucristo-ven-sin-tardar`

## Cómo agregar un nuevo himno

1. Crea un archivo `.md` dentro de `content/hymns/`.
2. Agrega `title` (y opcionalmente `page`) en el frontmatter.
3. Escribe la letra en Markdown.
4. Guarda y verifica en el home que aparezca en el buscador.

Nota: los himnos se ordenan por `page` cuando existe; si no, por título (orden alfabético en español).
