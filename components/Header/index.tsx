import Image from "next/image"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { FaArrowDown } from "react-icons/fa"
import Wellcome from "../Wellcome"
import { useLogin } from "@/contexts/LoginContext"
import { redirect } from "next/navigation"

const Header = ({ department }: { department: string }) => {
    const { user } = useLogin()

    if (!user) return redirect("/")
    if (user === undefined) return null

    return (
        <header className="m-4 glass-effect flex py-4.5 border border-default-border-color rounded-md justify-center">
            <section className="flex justify-between gap-130">
                <div className="flex gap-5">
                    <Image src="/LOGO-ts2.svg" width="180" height="55" alt="Logo" />
                    <div className="flex-col text-xl">
                        <Wellcome name={user?.name} />
                        <span className="font-bold text-white uppercase">
                            { department }
                        </span>
                    </div>
                </div>
                <div className="flex gap-6">
                    <Button size="icon-lg" className="w-16 h-15" variant="outline">
                        <Image src="/line-md_bell-filled.svg" width="32" height="32" alt="Notificações" />
                    </Button>
                    <Button className="min-w-45 h-15 border border-default-orange bg-transparent gap-2">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={user?.image} alt="Avatar" />
                            <AvatarFallback>
                                TS
                            </AvatarFallback>
                        </Avatar>
                        <p className="font-bold text-default-orange text-xl">
                            Perfil
                        </p>
                        <FaArrowDown color="#ffa300" width="20" />
                    </Button>
                </div>
            </section>
        </header>
    )
}

export default Header