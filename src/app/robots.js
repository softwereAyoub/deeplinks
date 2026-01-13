// المسار: app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // لمنع أرشفة روابط الأكواد الخلفية
    },
    sitemap: 'https://direop.com/sitemap.xml',
  }
}