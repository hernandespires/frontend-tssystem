import { Upload } from "@/types/services/file/upload"
import { Dispatch, SetStateAction } from "react"

export interface UploadContextType { uploadData: Upload | null, setUploadData: Dispatch<SetStateAction<Upload | null>> }