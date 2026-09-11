import { MetadataRoute } from 'next';
import { articlesData } from '@/data/articlesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://seabirdexim.com';

  const staticRoutes = [
    '',
    '/landing',
    '/products',
    '/products/psyllium-husk',
    '/products/organic-psyllium-husk',
    '/products/private-label',
    '/applications',
    '/company',
    '/company/certifications',
    '/insights',
    '/insights/blog',
    '/insights/faq',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.startsWith('/products') ? 0.9 : 0.8,
  }));

  const blogRoutes = articlesData.map((article) => ({
    url: `${baseUrl}/insights/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
