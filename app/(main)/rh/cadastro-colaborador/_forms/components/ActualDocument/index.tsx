import Link from "next/link"

const ActualDocument = ({ children }: { children: string }) => {
    if (!children) return

    return (
        <div className={`text-sm text-gray-400 ${Array.isArray(children) && "text-center"}`}>
            {Array.isArray(children) ? <p>Documento(s) atual(is):</p> : <>Documento(s) atual(is) -</>}
            <span className="text-blue-400 underline cursor-pointer block">
                { 
                    Array.isArray(children) ? (
                        children?.map((file, index) => file.length > 26 ? (
                            <Link key={index} className="block" href={`http://localhost:8080/file/download/${file}`}>{file.slice(0, 26)}...</Link>
                        ) : (
                            <Link key={index} className="block" href={`http://localhost:8080/file/download/${file}`}>{file}</Link>
                        ))
                    ) : (
                        <Link key={ children } className="block" href={`http://localhost:8080/file/download/${ children }`}>{ children }</Link>
                    )
                }
            </span>
        </div>
    )
}

export default ActualDocument