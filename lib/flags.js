import { unstable_flag as flag } from '@vercel/flags/next';
 
export const showINSALoginButton = flag({
  key: 'showINSALoginButton',
  decide: () => false,
});