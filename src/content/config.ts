// 1. Import utilities from `astro:content`
import { defineCollection, reference, z } from 'astro:content';

// 2. Define your collection(s)
const categoriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
  }),
});

const toolsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    categories: z.array(reference('categories')),
    link: z.string().url().optional(),
    openApiVersions: z.object({
      v2: z.boolean().optional(),
      v3: z.boolean().optional(),
      v3_1: z.boolean().optional(),
      v4: z.boolean().optional(),
    }),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  categories: categoriesCollection,
  tools: toolsCollection,
};
