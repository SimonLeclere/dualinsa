import { unstable_flag as flag } from '@vercel/flags/next';
 
export const testFlag1 = flag({
  key: 'test-flag-1',
  decide: () => false,
});

export const precomputeFlags = [testFlag1];