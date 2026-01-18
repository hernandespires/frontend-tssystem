"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const FileUploadPreview = () => {
    const [files, setFiles] = useState<{file: File, url: string}[]>([])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selected = Array.from(e.target.files || [])

        const mapped = selected.map((file) => ({
            file, url: URL.createObjectURL(file)
        }))

        setFiles((prev) => [...prev, ...mapped])
    }

    function removeFile(index: number) {
        setFiles((prev) => {
            const copy = [...prev]
            URL.revokeObjectURL(copy[index].url)
            copy.splice(index, 1)
            return copy
        })
    }

    return (
        <section className="space-y-4">
            <Input type="file" multiple onChange={handleChange} />
            <div>
                {files.map((item, index) => (
                <div key={index} className="relative border rounded-lg p-2 flex flex-col items-center justify-center">
                    {item.file.type.startsWith("image/") ? (                        
                        <img src={item.url} alt={item.file.name} className="h-32 w-full object-cover rounded-md" />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-32 text-sm text-muted-foreground">
                            <span className="font-medium">
                                {item.file.name}
                            </span>
                            <span>
                                {(item.file.size / 1024).toFixed(1)} KB
                            </span>
                        </div>
                    )}
                    <Button size="icon" variant="destructive" onClick={() => removeFile(index)} className="absolute top-1 right-1 h-6 w-6">
                        <X size={14} />
                    </Button>
                </div>
                ))}
            </div>
        </section>
    )
}

export default FileUploadPreview