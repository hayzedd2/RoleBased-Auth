import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db"
 
export const { handlers, auth , signIn , signOut } = NextAuth({
  callbacks : {
    async session({token , session}){
      console.log({sessionToken : session})
      if(session.user){
        session.user.customField = token.customField
      }
      return session
    },
    async jwt({token}){
      console.log(token)
      token.customField = "test"
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})