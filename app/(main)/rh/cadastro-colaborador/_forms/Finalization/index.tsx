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

const DropdownMenu = dynamic(
  () => import("../components/DropdownMenu"),
  { ssr: false }
)

const Finalization = ({
  urlPath,
  prevStep,
  actualStep,
  percentageProgress,
}: {
  urlPath: { name: string; route: string }[]
  prevStep: () => void
  actualStep: number
  percentageProgress: number
}) => {
  const { employeeData, setEmployeeData } =
    useContext(CreateEmployeeContext)

  const { uploadData } = useContext(UploadContext)

  const form = useZodForm(formSchema)
  const router = useRouter()

const handleCreateEmployee = async (values: SendEmployee) => {
  try {

    // ✅ 1 — junta todos arquivos
    const allFiles: File[] = Object.values(uploadData ?? {}).flat()

    let uploadedNames: string[] = []

    // ✅ 2 — upload primeiro
    if (allFiles.length) {
      const result = await multipleUpload(allFiles)

      // ajuste se necessário
      uploadedNames = result?.map((f:any) => f.name) ?? []
    }

    // ✅ 3 — monta payload final
    const merged = {
      ...employeeData,
      ...values,
      additionalDocuments: uploadedNames
    }

    const payload: any = { ...merged }
    delete payload.id

    setEmployeeData(payload)

    // ✅ 4 — cria employee
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

          <Progress
            value={percentageProgress}
            className="max-w-107.5"
          />
        </div>

        <div className="max-w-full flex items-center justify-center">
          <div className="w-200 h-72 flex flex-col justify-between items-center px-38.75 py-3">
            <DropdownMenu
              form={form}
              name="department"
              label="Departamento"
              schemaKeys={Object.keys(formSchema.shape)}
              options={[
                {
                  label: "Pesquisa & Desenvolvimento",
                  value: "RESEARCH_AND_DEVELOPMENT",
                },
                { label: "Web Design", value: "WEB_DESIGN" },
                { label: "Tráfego Pago", value: "PAID_TRAFFIC" },
              ]}
            />

            <DropdownMenu
              form={form}
              name="operation"
              label="Operação"
              schemaKeys={Object.keys(formSchema.shape)}
              options={[
                { label: "01", value: "_01" },
                { label: "02", value: "_02" },
                { label: "03", value: "_03" },
              ]}
            />

            <DropdownMenu
              form={form}
              name="level"
              label="Nível"
              schemaKeys={Object.keys(formSchema.shape)}
              options={[
                { label: "Puppy", value: "PUPPY" },
                { label: "Auxiliar", value: "ASSISTANT" },
                { label: "Junior", value: "JUNIOR" },
              ]}
            />
          </div>
        </div>
      </RegistrationForm>
    </section>
  )
}

export default Finalization