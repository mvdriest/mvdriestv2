import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
    collections: {
        projecten: defineCollection({
            type: 'page',
            source: 'projecten/*.md',
            schema: z.object({
                title: z.string(),
                tags: z.array(z.string()),
                projectAssetsDir: z.string(),
            })
        })
    }
})