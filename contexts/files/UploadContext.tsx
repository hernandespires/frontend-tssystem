// import { UploadContextType } from "@/types/contexts/file/upload"
// import { Upload } from "@/types/services/file/upload"
// import { createContext, ReactNode, useState } from "react"

// export const UploadContext = createContext<UploadContextType | null>(null)

// export const UploadProvider = ({ children }: { children: ReactNode }) => {
//     const [uploadData, setUploadData] = useState<Upload | null>(null)
//     return <UploadContext.Provider value={{ uploadData, setUploadData }}>{ children }</UploadContext.Provider>
// }

import { createContext, ReactNode, useState } from "react"

export type UploadContextType = {
  uploadData: Record<string, File[]>
  setFiles: (field: string, files: File[]) => void
  clearUploads: () => void
}

export const UploadContext = createContext<UploadContextType | null>(null)

export const UploadProvider = ({ children }: { children: ReactNode }) => {

  const [uploadData, setUploadData] = useState<Record<string, File[]>>({})

  const setFiles = (field: string, files: File[]) => {
    setUploadData(prev => ({
      ...prev,
      [field]: files
    }))
  }

  const clearUploads = () => {
    setUploadData({})
  }

  return (
    <UploadContext.Provider value={{ uploadData, setFiles, clearUploads }}>
      {children}
    </UploadContext.Provider>
  )
}