import { Inter } from "next/font/google";
import localFont from 'next/font/local'

import { AuthProvider } from "@/providers/sessionProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const feather = localFont({ src: '../../public/Feather Bold.ttf', variable: '--font-feather' });

export const metadata = {
  title: "Dualinsa",
  description: "Projet d'application INSA CVL",
};

export default async function RootLayout({ children, params: { locale } }) {

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <AuthProvider>
        <NextIntlClientProvider messages={messages}>
          <body className={`${inter.className} ${feather.variable}`}>{children}</body>
        </NextIntlClientProvider>
      </AuthProvider>
    </html>
  );
}
