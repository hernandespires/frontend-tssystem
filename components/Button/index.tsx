import { ReactNode, useEffect, useState } from "react"

const Button = ({ isFulled, isDashed = false, icon, text  }: { isFulled?: boolean, isDashed?: boolean, icon: ReactNode, text: string }) => {
    const [style, setStyle] = useState<string>("")
    
    useEffect(() => {
        if (isFulled && !isDashed) setStyle("bg-default-orange")
        else if (!isFulled && isDashed) setStyle("border border-dashed")
        else setStyle("border border-default-border-color")
    }, [])

    return (
        <button className={`flex flex-col justify-center items-center rounded gap-3 w-46 h-46 ${style}`}>
            { icon }
            <span className={`font-semibold text-xl w-35 ${!isFulled && "text-white"}`}>
                { text }
            </span>
        </button>
    )
}

export default Button