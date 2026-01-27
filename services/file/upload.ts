import api from "@/lib/api"
import { Upload } from "@/types/services/file/upload"

export const upload = async (file: File): Promise<Upload> => {
  return (await api.post<Upload>("/file/upload", file)).data
}

export const multipleUpload = async (files: File[]): Promise<Upload[]> => {
  const formData = new FormData()

  files.forEach(file => formData.append("files", file))

  const { data } = await api.post<Upload[]>("/file/multipleUpload", formData)

  return data
}