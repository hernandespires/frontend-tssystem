"use client"

import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../../../../../components/ui/progress"
import { formSchema } from "./formSchema"
import { CreateEmployeeContext } from "@/contexts/rh/Employee/CreateEmployeeContext"
import { useContext } from "react"
import { useZodForm } from "@/hooks/useZodForm"
import { SendEmployee } from "@/types/services/humanResources/employee"
import { toast } from "sonner"
import { createEmployee } from "@/services/humanResources/employee"
import { multipleUpload } from "@/services/file/upload"
import { UploadContext } from "@/contexts/files/UploadContext"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

const DropdownMenu = dynamic(() => import("../components/DropdownMenu"), { ssr: false })

const Finalization = ({
  urlPath,
  prevStep,
  actualStep,
  percentageProgress
}: {
  urlPath: { name: string; route: string }[]
  prevStep: () => void
  actualStep: number
  percentageProgress: number
}) => {
  const { employeeData, setEmployeeData } = useContext(CreateEmployeeContext)
  const { uploadData } = useContext(UploadContext)
  const form = useZodForm(formSchema)
  const router = useRouter()

  const HIDDEN_DEPARTMENTS = [
    "FINANCE",
    "HUMAN_RESOURCES",
    "MARKETING",
    "RESEARCH_AND_DEVELOPMENT",
    "SALES"
  ]

  const department = form.watch("department")
  const shouldHideOperation = HIDDEN_DEPARTMENTS.includes(department)

  const brToDateString = (value: string): string | null => {
    if (!value) return null

    const parts = value.split("/")
    if (parts.length !== 3) return null

    const [dd, mm, yyyy] = parts.map(Number)
    const date = new Date(yyyy, mm - 1, dd)

    if (isNaN(date.getTime())) return null

    return date.toLocaleDateString("pt-BR")
  }

  const normalizeToBackendDate = (value: unknown): string | null => {
    if (!value) return null

    let date: Date | null = null

    if (value instanceof Date) date = value
    else if (typeof value === "string" && /^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      const [dd, mm, yyyy] = value.split("/").map(Number)
      date = new Date(yyyy, mm - 1, dd)
    } else if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
      date = new Date(value)
    } else if (typeof value === "string") {
      date = new Date(value)
    }

    if (!date || isNaN(date.getTime())) return null

    const d = String(date.getDate()).padStart(2, "0")
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const y = date.getFullYear()

    return `${d}/${m}/${y}`
  }

  const handleCreateEmployee = async (values: SendEmployee) => {
    try {
      const allFiles: File[] = Object.values(uploadData ?? {}).flat()

      let uploadedNames: string[] = []

      if (allFiles.length) {
        const result = await multipleUpload(allFiles)
        uploadedNames = result?.map((f: any) => f.name) ?? []
      }

      const merged = { ...employeeData, ...values, additionalDocuments: uploadedNames }

      const payload: any = { ...merged }
      delete payload.id

      setEmployeeData(payload)

      const created = await createEmployee(payload)

      return !!created
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const handleNextStep = async (values: SendEmployee) => {
    const ok = await handleCreateEmployee(values)

    if (ok) {
      toast.success("Colaborador cadastrado com sucesso!")
      router.push("/rh")
    } else {
      toast.error("Erro ao cadastrar colaborador")
    }
  }

  return (
    <section>
      <RegistrationForm
        formSchema={formSchema}
        urlPath={urlPath}
        form={form}
        prevStep={prevStep}
        nextStep={handleNextStep}
      >
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-2xl font-bold text-default-orange">
            {actualStep}/5 - Dados Pessoais
          </h1>
          <Progress value={percentageProgress} className="max-w-107.5" />
        </div>

        <div className="max-w-full flex items-center justify-center">
          <div className="w-200 h-72 flex flex-col gap-y-4 justify-center items-center px-38.75 py-3">
            <DropdownMenu
              form={form}
              name="department"
              label="Departamento"
              schemaKeys={Object.keys(formSchema.shape)}
              options={[
                { label: "Audiovisual", value: "AUDIOVISUAL" },
                { label: "Design", value: "DESIGN" },
                { label: "Gestor Estratégico", value: "STRATEGIC_MANAGER" },
                { label: "Gestor de Projetos", value: "PROJECT_MANAGER" },
                { label: "Social Media", value: "SOCIAL_MEDIA" },
                { label: "Tradutor", value: "TRANSLATION" },
                { label: "Tráfego Pago", value: "PAID_TRAFFIC" },
                { label: "Web Design", value: "WEB_DESIGN" },
                { label: "Financeiro", value: "FINANCE" },
                { label: "Recursos Humanos", value: "HUMAN_RESOURCES" },
                { label: "Marketing", value: "MARKETING" },
                { label: "Pesquisa & Desenvolvimento", value: "RESEARCH_AND_DEVELOPMENT" },
                { label: "Vendas", value: "SALES" }
              ]}
            />

            {!shouldHideOperation && (
              <DropdownMenu
                form={form}
                name="operation"
                label="Operação"
                schemaKeys={Object.keys(formSchema.shape)}
                options={[
                  { label: "01", value: "_01" },
                  { label: "02", value: "_02" },
                  { label: "03", value: "_03" }
                ]}
              />
            )}

            <DropdownMenu
              form={form}
              name="level"
              label="Nível"
              schemaKeys={Object.keys(formSchema.shape)}
              options={[
                { label: "Teste", value: "TEST" },
                { label: "Puppy", value: "PUPPY" },
                { label: "Auxiliar", value: "ASSISTANT" },
                { label: "Eagle Junior", value: "JUNIOR_EAGLE" },
                { label: "Eagle Pleno", value: "MID_LEVEL_EAGLE" },
                { label: "Eagle Senior", value: "SENIOR_EAGLE" },
                { label: "High Eagle Junior", value: "JUNIOR_HIGH_EAGLE" },
                { label: "High Eagle Pleno", value: "MID_LEVEL_HIGH_EAGLE" },
                { label: "High Eagle Senior", value: "SENIOR_HIGH_LEVEL" }
              ]}
            />
          </div>
        </div>
      </RegistrationForm>
    </section>
  )
}

export default Finalization
