const LoginLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <main className="min-h-screen bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat">
    { children }
  </main>
)

export default LoginLayout
