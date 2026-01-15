"use client"

import { useRouter } from "next/navigation"
import { ReactNode } from "react"

const Button = ({ isFulled, isDashed = false, onClick, icon, text }: { isFulled?: boolean, isDashed?: boolean, onClick: string, icon: ReactNode, text: string }) => {
    const router = useRouter()

    return (
        <button
            onClick={() => router.push(onClick)}
            className={`
                flex flex-col justify-center items-center rounded gap-3 w-46 h-46 transition 
                ${(isFulled && !isDashed) ? "bg-default-orange" : (!isFulled && isDashed) ? "border border-dashed" : (!isFulled && !isDashed) && "border border-default-border-color"}
            `}
        >
            { icon }
            <span className={`font-semibold text-xl w-36 ${isFulled && "text-black"}`}>
                {text}
            </span>
        </button>
    )
}

export default Button