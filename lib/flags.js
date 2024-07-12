import { unstable_flag as flag } from '@vercel/flags/next';
 
export const showInsaAuthFlag = flag({
  key: 'show-insa-auth',
  description: 'Show INSA authentication button on login page',
  options: [
    { label: 'Show', value: true },
    { label: 'Hide', value: false },
  ],
  decide: () => process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production',
});

export const darkModeFlag = flag({
  key: 'dark-mode',
  description: 'Enable dark mode',
  default: false,
  options: [
    { label: 'Enable', value: true },
    { label: 'Disable', value: false },
  ],
  decide: () => false,
});

export const precomputeFlags = [showInsaAuthFlag, darkModeFlag];