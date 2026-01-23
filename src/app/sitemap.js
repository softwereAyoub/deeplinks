export default function sitemap() {
  const baseUrl = 'https://direop.com'; // استبدله برابط موقعك الحقيقي

  // قائمة بجميع المسارات التي أنشأناها
  const paths = [
    '', // الصفحة الرئيسية
    '/special-characters-math',
    '/special-characters-numbers',
    '/special-characters-letters',
    '/special-characters-emoji',
    '/special-characters-arrows',
    '/privacy',
    '/about',
    '/terms',
  ];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1.0 : 0.8, // الصفحة الرئيسية لها الأولوية القصوى
  }));
}