import createMiddleware from 'next-intl/middleware';
import { locales } from '@/i18n';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
 
  // Used when no locale matches
  defaultLocale: 'en'
});

// TODO: dynamically generate the list of locales
 
export const config = { 
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/en/api`, or `/fr/api`
    // - … if they start with `/_next`, or `/_vercel`
    // - … if they end with file extensions like `.map`, `.ico`, `.png`, etc.
    '/((?!\\/?(?:en|fr)?\\/api|_next|_next/image|_vercel|.*\\..*).*)',
  ]
};