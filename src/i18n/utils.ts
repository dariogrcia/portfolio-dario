import translations, { type Lang, type TranslationKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  return url.pathname === '/es' || url.pathname.startsWith('/es/')
    ? 'es'
    : 'en';
}

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key];
}

export function localizedPath(path: string, targetLang: Lang): string {
  const [pathname = '', suffix = ''] = path.split(/([?#].*)/s, 2);
  let normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;

  if (normalizedPath === '/es' || normalizedPath.startsWith('/es/')) {
    normalizedPath = normalizedPath.slice(3) || '/';
    normalizedPath = normalizedPath.replace(
      /^\/proyectos(?=\/|$)/,
      '/projects',
    );
  }

  if (targetLang === 'es') {
    normalizedPath = normalizedPath.replace(
      /^\/projects(?=\/|$)/,
      '/proyectos',
    );
    normalizedPath = `/es${normalizedPath}`;
  }

  return `${normalizedPath}${suffix}`;
}
