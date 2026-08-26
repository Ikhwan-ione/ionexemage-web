import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ionexemage.ionexe.my.id', // Ganti dengan domain akhirmu nanti
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}