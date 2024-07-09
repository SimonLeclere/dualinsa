import createMiddleware from 'next-intl/middleware';
import { locales } from '@/i18n';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
 
  // Used when no locale matches
  defaultLocale: 'en'
});
 
export const config = { 
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ]
 };