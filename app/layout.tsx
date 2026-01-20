import type { Metadata } from "next"
import "./globals.css"
import { LoginProvider } from "@/contexts/LoginContext"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { getServerSession } from "next-auth"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "TS System",
  description: "Sistema do TS",
  icons: {
    icon: "/favicon.webp", 
  },
}

const inter = Inter({subsets: ["latin"], variable: "--font-inter"})

const RootLayout = async ({ children }: Readonly<{children: React.ReactNode}>) => {
  const session = await getServerSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-[url('/FLUID-BG.png')] bg-cover bg-center bg-no-repeat`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LoginProvider initialUser={session?.user || null}>
            <Toaster richColors position="top-center" />
            { children }
          </LoginProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout