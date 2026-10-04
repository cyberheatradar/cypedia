import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/generated/pages'
  })
});

export const collections = { pages };
