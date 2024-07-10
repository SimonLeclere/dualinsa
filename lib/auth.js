import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
import { pbkdf2Sync } from 'crypto';

import prisma from "@/lib/supabase";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prismaAdapter = PrismaAdapter(prisma);

prismaAdapter.createUser = (data) => {
  return prisma.user.create({
    data: {
      username: data.username,
      hashedPassword: data.hashedPassword,
      salt: data.salt,
    },
  });
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/en/auth/signin',
    signOut: '/en/auth/signout',
  },
  // debug: true,
  adapter: prismaAdapter,
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  providers: [
    {
      id: "insa",
      name: "INSA",
      type: "oidc",
      // wellKnown: "https://cas.insa-cvl.fr/cas/oidc/.well-known/openid-configuration",

      // authorization: "https://cas.insa-cvl.fr/cas/oidc/oidcAuthorize",
      // userinfo: "https://cas.insa-cvl.fr/cas/oidc/oidcProfile",
      // authorization: {
      //   params: { scope: "openid profile" }
      // },
      issuer: "https://cas.insa-cvl.fr/cas/oidc",

      token: {
        url: "https://cas.insa-cvl.fr/cas/oidc/oidcAccessToken",
        conform: async (response) => {
          if (response.status === 401) return response;

          const newHeaders = Array.from(response.headers.entries())
            .filter(([key]) => key.toLowerCase() !== "www-authenticate")
            .reduce((headers, [key, value]) => (headers.append(key, value), headers), new Headers());

          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
          });
        },
      },

      idToken: true,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      // checks: ["pkce", "state"],
      checks: ['none'],
      profile(profile) {

        return {
          id: profile.sub,
          username: profile.preferred_username,
        }
      },
    },

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Nom d'utilisateur", type: "text" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials, req) {

        if (!credentials?.username || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user) return null;

        if (user.hashedPassword === pbkdf2Sync(credentials.password, user.salt, 1000, 64, 'sha512').toString('hex')) {
          delete user.hashedPassword;
          delete user.salt;

          return user;
        }

        return null;
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          username: user.username,
          score: user.score,
          dailyGoal: user.dailyGoal,
          dailyGoalPreference: user.dailyGoalPreference,
          lastCourse: user.lastCourse,
          avatar: user.avatar,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      }

      delete token.name;
      delete token.email;
      delete token.picture;

      return token;
    },

    async session({ session, token }) {
      if (token?.user) session.user = token.user;
      return session;
    },

    async redirect({ url, baseUrl }) {
      const redirectUrl = url.startsWith('/') ? new URL(url, baseUrl).toString() : url;
      // console.log(`[next-auth] Redirecting to "${redirectUrl}" (resolved from url "${url}" and baseUrl "${baseUrl}")`);
      return redirectUrl;
    },
  },
});