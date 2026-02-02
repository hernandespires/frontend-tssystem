"use client"

import { ReactNode } from "react"

const Button = ({ isFulled, isDashed = false, onClick, icon, text }: { isFulled?: boolean, isDashed?: boolean, onClick: () => void, icon: ReactNode, text: string }) => {    
    return (
        <button
            onClick={ onClick }
            className={`
                flex flex-col justify-center items-center rounded gap-3 w-46 h-46 transition 
                ${ (isFulled && !isDashed) ? "bg-default-orange" : (!isFulled && isDashed) ? "border border-dashed" : (!isFulled && !isDashed) && "border border-default-border-color" }
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