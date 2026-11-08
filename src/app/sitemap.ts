import type { MetadataRoute } from 'next';

const BASE = 'https://espelhart.com';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: `${BASE}/`, changeFrequency: 'weekly', priority: 1 },
        { url: `${BASE}/politica-de-privacidade`, changeFrequency: 'yearly', priority: 0.2 },
        { url: `${BASE}/termos-de-uso`, changeFrequency: 'yearly', priority: 0.2 },
    ];
}
