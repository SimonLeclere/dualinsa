import NextAuth from "next-auth"
import { getServerSession as getSession } from "next-auth/next"

import CredentialsProvider from "next-auth/providers/credentials"
import { pbkdf2Sync } from 'crypto';

import prisma from "@/lib/supabase";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { strategy } from "sharp";

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

export const authOptions = {
  pages: {
    signIn: '/en/auth/signin',
  },
  debug: true,
  adapter: prismaAdapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    {
      id: "insa",
      name: "INSA",
      type: "oauth",
      wellKnown: "https://cas.insa-cvl.fr/cas/oidc/.well-known/openid-configuration",
      authorization: { params: { scope: "openid profile" } },
      idToken: true,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      checks: ["pkce", "state"],
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
    async jwt({ token, user, ...data }) {
      console.log("jwt data", data);
      console.log("jwt token before", token);
      console.log("jwt user", user);
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

      console.log("jwt token after", token);
      return token;
    },

    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    }
  },
};

const handler = NextAuth(authOptions);

export const getServerSession = async () => await getSession(authOptions);

export { handler as GET, handler as POST }
