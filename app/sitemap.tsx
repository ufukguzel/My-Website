import { MetadataRoute } from 'next'
import { readdirSync } from 'fs'
import { join } from 'path'
import { sharedMetadata } from '@/lib/shared-metadata'

const baseUrl = sharedMetadata.urls.website;

const excludedRoutes: string[] = [
    '/docs',
    '/docs/app-policy',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages = getStaticPages()
    const dynamicPages = await getDynamicPages()

    return [...staticPages, ...dynamicPages]
}

function getStaticPages(): MetadataRoute.Sitemap {
    const pagesDirectory = join(process.cwd(), 'app')
    const staticPages = walkDirectory(pagesDirectory)

    return staticPages
        .filter(route => !isExcluded(route))
        .map(route => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date().toISOString(),
        }))
}

function isExcluded(route: string): boolean {
    return excludedRoutes.some(excludedRoute => route.startsWith(excludedRoute))
}

function walkDirectory(dir: string, basePath: string = ''): string[] {
    let results: string[] = []
    const list = readdirSync(dir, { withFileTypes: true })

    for (const file of list) {
        if (file.isDirectory()) {
            if (file.name.startsWith('(') || file.name === 'api') continue // Route gruplarını ve API rotalarını atla
            results = results.concat(walkDirectory(join(dir, file.name), `${basePath}/${file.name}`))
        } else if (file.name === 'page.tsx' || file.name === 'page.js') {
            const route = basePath || '/'
            if (!results.includes(route)) results.push(route)
        }
    }

    return results
}

async function getDynamicPages(): Promise<MetadataRoute.Sitemap> {
    const posts = await fetchBlogPosts()

    return posts.map(post => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
    }))
}

interface BlogPost {
    slug: string
    updatedAt: string
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
    return [
        // { slug: 'first-post', updatedAt: '2023-01-01T00:00:00.000Z' },
        // { slug: 'second-post', updatedAt: '2023-01-02T00:00:00.000Z' },
    ]
}

