import { create } from "zustand"

type UploadStore = {
  uploadData: Record<string, File[]>
  setFiles: (field: string, files: File[]) => void
  clearUploads: () => void
}

export const useUploadStore = create<UploadStore>()((set) => ({
  uploadData: {},
  setFiles: (field, files) =>
    set((state) => ({ uploadData: { ...state.uploadData, [field]: files } })),
  clearUploads: () => set({ uploadData: {} })
}))
