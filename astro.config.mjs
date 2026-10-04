import { defineConfig } from 'astro/config';

const base = process.env.CYPEDIA_BASE || '/';

export default defineConfig({
  site: 'https://cyberheatradar.github.io',
  base,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: {
    enabled: false
  }
});
