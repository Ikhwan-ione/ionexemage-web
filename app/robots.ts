import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://ionexemage.ionexe.my.id/sitemap.xml', // Sesuaikan domain
  }
}