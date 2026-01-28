"use client"

import { useRouter } from "next/navigation"
import { ReactNode } from "react"

const Button = ({ isFulled, isHorizontal = false, isDashed = false, onClick, icon, text, className = "" }: { isFulled?: boolean, isHorizontal?: boolean, isDashed?: boolean, onClick: string, icon: ReactNode, text: string, className?: string }) => {
    const router = useRouter()

    return (
        <button
            onClick={() => router.push(onClick)}
            className={`
                flex items-center rounded gap-3 transition 
                
                ${isHorizontal 
                    ? "flex-row justify-start w-full h-32 px-8"  
                    : "flex-col justify-center w-46 h-46" 
                }

                ${(isFulled && !isDashed) ? "bg-default-orange text-black" : (!isFulled && isDashed) ? "border border-dashed" : (!isFulled && !isDashed) && "border border-default-border-color"}

                ${className}
            `}
        >
            { icon }
            
            <span className={`font-semibold text-xl ${isHorizontal ? "text-left" : "w-36 text-center"} ${isFulled && "text-black"}`}>
                {text}
            </span>
        </button>
    )
}

export default Button