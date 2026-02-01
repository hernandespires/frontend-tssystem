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

export const download = async (name: string): Promise<File> => {
  const res = await api.get(`/file/download/${name}`, { responseType: 'blob' })
  const resAsBlob = res.data
  const mimeType = res.headers['content-type'] || 'application/octet-stream'

  const file = new File([resAsBlob], name, { type: mimeType })

  return file
}