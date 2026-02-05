// import { download } from "@/services/file/upload"
// import { toast } from "sonner"

// export const handleDownload = async (name: string) => {
//     if (!name) return

//     try {
//         const file = await download(name)
//         const url = window.URL.createObjectURL(file)
//         const link = document.createElement('a')

//         link.href
//     } catch (err) {
//         toast.error("Erro ao baixar arquivo: " + name)
//     }
// }

import { Employee } from "@/types/services/humanResources/employee"
import { toast } from "sonner"

export const handleConflictingValues = (dataFound: Employee | null, allDataFound: Employee[], dataToCompare: keyof Employee, value: string, conflictFieldMessages: Record<keyof Employee, string>): boolean => {
    const hasConflict = !dataFound[dataToCompare] && allDataFound.some((employee) => employee[dataToCompare] === value)

    if (hasConflict) {
        toast.error(`${conflictFieldMessages[dataToCompare]} já foi cadastrado para outro colaborador`)
        return true
    }

    return false
}