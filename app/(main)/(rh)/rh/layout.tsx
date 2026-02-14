import ClientShell from "./ClientShell"

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => <ClientShell>{ children }</ClientShell>

export default RootLayout