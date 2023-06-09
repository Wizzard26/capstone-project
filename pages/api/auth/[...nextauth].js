import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from "@/db/connect";
import User from "@/db/models/user";
import bcrypt from "bcryptjs";

const initializeDb = async () => {
  const db = await dbConnect();
  return db;
};

export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      profile(profile) {
        return { role: profile.role ?? "user" }
      },
      async authorize(credentials, req) {
        // const db = await initializeDb();
        await initializeDb();
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email })
        if (!user) {
          throw new Error("You haven't register yet")
        }

        if (user) {
          return signInUser({ password, user })
        }
      }
    })
  ],
  pages: {
    signIn: "/auth"
  },
  callbacks: {
    jwt({ token, user }) {
      if(user) token.role = user.role
      return token
    },
    async session({ session, token, user}) {
      session.accessToken = token.accessToken
      session.user.id = token.id
      session.user.role = token.role
      return session
    }
  },
  secret: "secret",
  database: process.env.MONGODB_URI,
})

const signInUser = async({password, user}) => {
  if (!user.password) {
    throw new Error("Please enter password")
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("User or Password not correct");
  }
  return user
}