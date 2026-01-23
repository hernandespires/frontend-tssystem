import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    // ESSA LINHA SERVE PARA PROCESSAR O NEXTAUTH NO AMBIENTE DA VPS:
    secret: process.env.NEXTAUTH_SECRET,
    
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ]
})

export { handler as GET, handler as POST }