// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// En GitHub Actions, GitHub informa del usuario y del repositorio (GITHUB_REPOSITORY),
// así que la dirección de la web se calcula sola. En local se usa http://localhost:4321/
const [usuario, repositorio] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const enGitHub = Boolean(usuario && repositorio);
const esRepoDeUsuario = repositorio?.toLowerCase() === `${usuario?.toLowerCase()}.github.io`;

export default defineConfig({
  site: enGitHub ? `https://${usuario}.github.io` : 'http://localhost:4321',
  base: enGitHub && !esRepoDeUsuario ? `/${repositorio}` : '/',
  integrations: [
    starlight({
      title: 'Robótica Móvil',
      description: 'Memorias de las prácticas de la asignatura de Robótica Móvil.',
      logo: { src: './src/assets/logo.svg' },
      favicon: '/favicon.svg',
      defaultLocale: 'root',
      locales: { root: { label: 'Español', lang: 'es' } },
      social: [
        { icon: 'github', label: 'GitHub', href: enGitHub ? `https://github.com/${usuario}/${repositorio}` : 'https://github.com' },
      ],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Sobre la asignatura', slug: 'asignatura' },
        // ------------------------------------------------------------------
        // CADA PRÁCTICA ES UN GRUPO. Para añadir una nueva:
        //  1. Copia la carpeta src/content/docs/practicas/practica-1 como practica-4
        //  2. Copia uno de estos bloques y cambia label y directory
        //  3. Añade su tarjeta en src/content/docs/index.mdx
        // ------------------------------------------------------------------
        {
          label: 'Práctica 1 · Aspirador básico',
          collapsed: true,
          autogenerate: { directory: 'practicas/practica-1' },
        },
        {
          label: 'Práctica 2',
          collapsed: true,
          autogenerate: { directory: 'practicas/practica-2' },
        },
        {
          label: 'Práctica 3',
          collapsed: true,
          autogenerate: { directory: 'practicas/practica-3' },
        },
        { label: 'Bibliografía', slug: 'bibliografia' },
      ],
    }),
  ],
});
