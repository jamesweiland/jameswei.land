import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection, reference, type ImageFunction } from 'astro:content';

const imageSchema = (image: ImageFunction) =>
    z.object({
        src: image(),
        alt: z.string().optional()
    });

const seoSchema = (image: ImageFunction) =>
    z.object({
        title: z.string().min(5).max(120).optional(),
        description: z.string().min(15).max(160).optional(),
        image: imageSchema(image).optional(),
        pageType: z.enum(['website', 'article']).optional()
    });

const blog = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            excerpt: z.string().optional(),
            updatedDate: z.coerce.date().optional(),
            isFeatured: z.boolean().default(false),
            isPrivate: z.boolean().default(false),
            tags: z.array(z.string()).default([]),
            project: reference('projects').optional(),
            seo: seoSchema(image).optional()
        })
});

const pages = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            seo: seoSchema(image).optional()
        })
});

const projects = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            isFeatured: z.boolean().default(false),
            isPrivate: z.boolean().default(false),
            seo: seoSchema(image).optional()
        })
});

// one off stuff
const siteContent = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/site' }),
    schema: z.object({})
});

export const collections = { blog, pages, projects, siteContent };
