import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../../ui/progress"
import { formSchema } from "./formSchema"
import { CreateEmployeeContext } from "@/contexts/rh/CreateEmployeeContext"
import { useContext } from "react"
import { useZodForm } from "@/hooks/useZodForm"
import { SendEmployee } from "@/types/services/humanResources/employee"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import DropdownMenu from "../../components/DropdownMenu"
import { redirect } from "next/navigation"
import { toast } from "sonner"
import { createEmployee } from "@/services/humanResources/employee"
import { multipleUpload } from "@/services/file/upload"
import { UploadContext } from "@/contexts/files/UploadContext"


const Finalization = (
    { urlPath, prevStep, actualStep, percentageProgress }: { urlPath: { name: string; route: string; }[], prevStep: () => void, actualStep: number, percentageProgress: number, nextStep?: () => void }
) => {
    const { employeeData, setEmployeeData } = useContext(CreateEmployeeContext)
    const { uploadData } = useContext(UploadContext)

    const form = useZodForm(formSchema)

    console.log("uploadData - Final😗", uploadData)
    
    const handleCreateEmployee = async (values: SendEmployee) => {
        const newEmployee: SendEmployee = { ...employeeData, ...values }
        
        useIsValidFormField({ form, fields: values, setData: setEmployeeData })

        const createNewEmployee = await createEmployee(newEmployee)        

        const uploadFiles = await multipleUpload(uploadData)

        if (createNewEmployee && uploadFiles) return true

        return false
    }

    const handleNextStep = async (values: SendEmployee) => {
        const response = await handleCreateEmployee(values)

        if (response) {
            toast.success("Colaborador cadastrado com sucesso!")
            redirect("/rh")
        }
    }

    console.log(employeeData)

    return (
        <section>
            <RegistrationForm formSchema={formSchema} urlPath={ urlPath } form={form} prevStep={ prevStep } nextStep={handleNextStep}>
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-2xl font-bold text-default-orange">
                        { actualStep }/5 - Dados Pessoais
                    </h1>
                    <Progress value={ percentageProgress } className="max-w-107.5" />
                </div>
                <div className="max-w-full flex items-center justify-center">
                    <div className="w-200 h-72 flex flex-col justify-between items-center px-38.75 py-3">
                        <DropdownMenu form={form} name="department" label="Departamento" schemaKeys={Object.keys(formSchema.shape)} options={
                            [{ label: "Pesquisa & Desenvolvimento", value: "RESEARCH_AND_DEVELOPMENT" }, { label: "Web Design", value: "WEB_DESIGN" }, { label: "Tráfego Pago", value: "PAID_TRAFFIC" }]
                        } />
                        <DropdownMenu form={form} name="operation" label="Operação" schemaKeys={Object.keys(formSchema.shape)} options={
                            [{ label: "01", value: "_01" }, { label: "02", value: "_02" }, { label: "03", value: "_03" }]
                        } />
                        <DropdownMenu form={form} name="level" label="Nível" schemaKeys={Object.keys(formSchema.shape)} options={
                            [{ label: "Puppy", value: "PUPPY" }, { label: "Auxiliar", value: "ASSISTANT" }, { label: "Junior", value: "JUNIOR" }]
                        } />
                    </div>
                </div>
            </RegistrationForm>
        </section>
    )
}

export default Finalization