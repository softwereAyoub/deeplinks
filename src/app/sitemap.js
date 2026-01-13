// المسار: app/sitemap.js
export default function sitemap() {
  return [
    {
      url: 'https://direop.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://direop.com/dashboard', // إذا كنت تريد أرشفة لوحة التحكم (اختياري)
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}