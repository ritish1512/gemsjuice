{/*import NextAuth, { DefaultSession, User as NextAuthUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// 1. Extend the built-in session types to include the custom 'id' property
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<NextAuthUser | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        await connectDB();

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Fetch user from MongoDB
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid credentials");
        }

        if (!user.isEmailVerified) {
          throw new Error("Email not verified");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          throw new Error("Invalid credentials");
        }

        // Return object matching NextAuthUser shape
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({
  user,
  account,
}) {

  if (
    account?.provider === "google"
  ) {

    await connectDB();

    const existingUser =
      await User.findOne({
        email: user.email,
      });

    if (!existingUser) {

      await User.create({
        name: user.name,

        email: user.email,

        image: user.image,

        provider: "google",

        googleId:
          account.providerAccountId,

        isEmailVerified: true,
      });

    }
  }

  return true;
}
  },
});
*/}