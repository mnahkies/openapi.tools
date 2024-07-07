// 1. Import utilities from `astro:content`
import { defineCollection, reference, z } from 'astro:content';

import { icons } from '../components/Icon';

const iconNames = Object.keys(icons);

const BannerSponsorSchema = z.object({
  name: z.string(),
  description: z.string(),
  ctaText: z.string().max(20), // 20 characters max
  ctaUrl: z.string().url(),
});

export type BannerSponsor = z.infer<typeof BannerSponsorSchema>;

const CategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  icon: z
    .string()
    .optional()
    .nullable()
    .refine((value) => !value || (value && iconNames.includes(value)), {
      message: 'Invalid icon name. Must be one of: ' + iconNames.join(', '),
    }),
});

export type Category = z.infer<typeof CategorySchema>;

const ToolSchema = z.object({
  name: z.string(),
  description: z.string(),
  categories: z.array(reference('categories')),
  languages: z.record(z.boolean()).optional(),
  link: z.string().url().optional(),
  repo: z.string().url().optional(),
  openApiVersions: z.object({
    v2: z.boolean().optional(),
    v3: z.boolean().optional(),
    v3_1: z.boolean().optional(),
    v4: z.boolean().optional(),
  }),
  featuredArticles: z
    .array(
      z.object({
        title: z.string(),
        url: z.string().url(),
        date: z.date(),
      })
    )
    .optional(),
  sponsorship: z
    .object({
      startDate: z.date(),
      url: z.string().url().optional(), // optionally override default link while sponsored
      testimonial: z.string().optional(), // optionally include a testimonial
    })
    .optional(),
});

export type Tool = z.infer<typeof ToolSchema>;

// 2. Define your collection(s)
const bannerSponsorsCollection = defineCollection({
  type: 'content',
  schema: BannerSponsorSchema,
});

const categoriesCollection = defineCollection({
  type: 'content',
  schema: CategorySchema,
});

const toolsCollection = defineCollection({
  type: 'content',
  schema: ToolSchema,
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  categories: categoriesCollection,
  tools: toolsCollection,
  bannerSponsors: bannerSponsorsCollection,
};
