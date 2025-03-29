import NextAuth, { DefaultSession } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { User as AdapterUser } from "next-auth";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

export const config = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      authorization: {
        params: {
          prompt: "login",
          response_type: "code",
          scope: "openid profile email",
        },
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Read users from JSON file
          const filePath = path.join(process.cwd(), "localData", "users.json");
          const fileContents = await fs.readFile(filePath, "utf8");
          const users = JSON.parse(fileContents);

          // Find user by email
          const user = users.find((u: User) => u.email === credentials.email);
          if (!user) {
            return null;
          }

          // Verify password
          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (!isValid) {
            return null;
          }

          // Return user data without password
          const { ...userWithoutPassword } = user;
          return userWithoutPassword as User;
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user: User | AdapterUser | null;
    }) {
      if (user && "role" in user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60,
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
