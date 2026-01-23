// المسار: app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // لمنع أرشفة روابط الأكواد الخلفية
    },
    sitemap: 'https://direop.com/sitemap.xml',
  }
}