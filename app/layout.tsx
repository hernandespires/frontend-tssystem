import type { Metadata } from "next"
import "./globals.css"
import { LoginProvider } from "@/contexts/LoginContext"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "TS System",
  description: "Sistema do TS",
  icons: {
    icon: "/favicon.png", 
  },
}

const inter = Inter({subsets: ["latin"], variable: "--font-inter"})

// Adicionei 'initialUser={null}' no LoginProvider abaixo
const RootLayout = ({ children }: Readonly<{children: React.ReactNode}>) => (
  <html lang="en" suppressHydrationWarning>
    <body className={`${inter.className} min-h-screen bg-[url('/FLUID-BG.png')] bg-cover bg-center bg-no-repeat`}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <LoginProvider initialUser={null}>
          { children }
        </LoginProvider>
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout