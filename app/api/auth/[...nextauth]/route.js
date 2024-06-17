import NextAuth from "next-auth"
import { getServerSession as getSession } from "next-auth/next"

import CredentialsProvider from "next-auth/providers/credentials"

import { pbkdf2Sync } from 'crypto';

import prisma from "@/lib/supabase";


// Fichier spécifique pour gérer l'authentification avec NextAuth

export const authOptions = {
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: { label: "Nom d'utilisateur", type: "text" },
        password: { label: "Mot de passe", type: "password" }
      },

      // Fait une requête à la base de données pour vérifier si les identifiants sont corrects
      async authorize(credentials, req) {

        if (!credentials?.username || !credentials?.password) return null;

        const user = await prisma.users.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user) return null;

        if (user.hash === pbkdf2Sync(credentials.password, user.salt, 1000, 64, 'sha512').toString('hex')) {

          return {
            id: user.id,
            username: user.username,
            // hash: user.hash,
            // salt: user.salt,
            createdAt: user.createdAt,
          }
        }

        return null;
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if(user) token.user = user;

      return token;
    },

    async session({ session, token }) {      
      if(token.user) session.user = token.user;
      return session;
    }
  },
};

const handler = NextAuth(authOptions);

export const getServerSession = async () => await getSession(authOptions);

export { handler as GET, handler as POST }