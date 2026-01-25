import { UploadContextType } from "@/types/contexts/file/upload"
import { Upload } from "@/types/services/file/upload"
import { createContext, ReactNode, useState } from "react"

export const UploadContext = createContext<UploadContextType | null>(null)

export const UploadProvider = ({ children }: { children: ReactNode }) => {
    const [uploadData, setUploadData] = useState<Upload | null>(null)
    return <UploadContext.Provider value={{ uploadData, setUploadData }}>{ children }</UploadContext.Provider>
}