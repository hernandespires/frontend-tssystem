import { getServerSession } from "next-auth"
import ClientShell from "./ClientShell"

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const session = await getServerSession()

    return <ClientShell session={session}>{ children }</ClientShell>
}

export default RootLayout