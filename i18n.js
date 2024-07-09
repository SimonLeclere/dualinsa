import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import deepmerge from 'deepmerge';
 
// Can be imported from a shared config
export const locales = ['fr', 'en'];
 
export default getRequestConfig(async ({locale}) => {

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();
 

  const userMessages = (await import(`@/translations/${locale}.json`)).default;
  const defaultMessages = (await import('@/translations/fr.json')).default;
  const messages = deepmerge(defaultMessages, userMessages);

  return { messages };
});