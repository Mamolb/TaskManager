import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
        clientId: process.env.GITHUB_ID!,//The ! tells TypeScript that the value is not null or undefined.
        clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  // Additional configuration options if needed.
};


const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};

