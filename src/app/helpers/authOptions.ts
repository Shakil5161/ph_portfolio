import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    token: string; // Add token to session
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    token?: string; // Add token to user
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    token?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Email Or Password Is Missing..");
          return null;
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            })
          });

          if (!res.ok) {
            console.error("Login Failed", await res.text());
            return null;
          }

          const data = await res.json();
          const user = data?.data?.user;
          const token = data?.data?.token;

          

          if (user?.id && token) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              token: token // Make sure token is included
            };
          } else {
            console.error("User ID or Token missing in response");
            return null;
          }

        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token; // Store token in JWT
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.token = token.token as string; // Add token to session
      }
      return session;
    }
  },
  
  secret: process.env.NEXTAUTH_SECRET, 
  pages: {
    signIn: "/login",
    error: "/login" 
  },
  session: {
    strategy: "jwt", 
    maxAge: 30 * 24 * 60 * 60, 
  },
  debug: process.env.NODE_ENV === "development", 
};