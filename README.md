# Robótica Móvil · Memorias de prácticas

Cuaderno de prácticas con pantalla inicial y una memoria por práctica. Se publica solo en GitHub Pages cada vez que subes cambios.

## Publicar (una sola vez)

1. Sube este contenido a tu repositorio (rama `main` o `master`).
2. En GitHub: **Settings → Pages → Source → GitHub Actions**.
3. Espera 1-2 minutos (pestaña **Actions**). La web queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

No hace falta cambiar ninguna dirección: se calcula sola.

## Cada vez que añadas contenido

```bash
git add .
git commit -m "Añado práctica X"
git push
```

## Probarlo en tu ordenador (opcional)

```bash
npm install
npm run dev      # http://localhost:4321/
```

## Añadir una práctica nueva

1. Copia `src/content/docs/practicas/practica-3` y pégala como `practica-4`.
2. En `astro.config.mjs`, copia un bloque de práctica dentro de `sidebar` y cambia `label` y `directory`.
3. En `src/content/docs/index.mdx`, copia una `LinkCard` y cambia título y enlace.

## Dónde editar

| Qué | Dónde |
| --- | --- |
| Textos de cada práctica | `src/content/docs/practicas/` |
| Portada | `src/content/docs/index.mdx` |
| Imágenes | `src/assets/` |
| Colores y fuentes | `src/styles/custom.css` |
