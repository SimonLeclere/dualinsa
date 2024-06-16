import { Inter } from "next/font/google";
import localFont from 'next/font/local'

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const feather = localFont({ src: '../public/Feather Bold.ttf', variable: '--font-feather' });

export const metadata = {
  title: "Dualinsa",
  description: "Projet d'application INSA CVL",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="fr">
      <body className={`${inter.className} ${feather.variable}`}>{children}</body>
    </html>
  );
}