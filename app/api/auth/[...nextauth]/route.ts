import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { Account, User as AuthUser } from "next-auth";
import connectMongoDB from "@/utils/mongodb";
import User from "@/models/User";

export const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  //   Specify URLs to be used if you want to create custom sign in, sign out and error pages.
  pages: {
    signIn: "/auth/signin",
    newUser: "/", // New users will be directed here on first sign in
  },
  // Callbacks are asynchronous functions you can use to control what happens when an action is performed.
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider === "google") {
        await connectMongoDB();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              name: user.name,
              email: user.email,
            });

            await newUser.save();
            return true;
          } else {
            return true;
          }
        } catch (error) {
          console.log("Error in saving user: ", error);
          return false;
        }
      }
      if (account?.provider === "github") {
        await connectMongoDB();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              name: user.name,
              email: user.email,
            });

            await newUser.save();
            return true;
          } else {
            return true;
          }
        } catch (error) {
          console.log("Error in saving user: ", error);
          return false;
        }
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
