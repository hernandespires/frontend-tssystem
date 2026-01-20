import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../../ui/progress"
import { formSchema } from "./formSchema"
import { CreateEmployeeContext } from "@/contexts/rh/CreateEmployeeContext"
import { useContext } from "react"
import { useZodForm } from "@/hooks/useZodForm"
import { SendEmployee } from "@/types/services/rh/employee"
import { onChangeFormStep } from "@/hooks/useIsValidFormField"
import DropdownMenu from "../../components/DropdownMenu"
import { redirect } from "next/navigation"
import { toast } from "sonner"
import { handleCreateEmployee } from "@/handles/rh/createEmployee"

const Finalization = (
    { urlPath, prevStep, actualStep, percentageProgress, nextStep }: { urlPath: { name: string; route: string; }[], prevStep: () => void, actualStep: number, percentageProgress: number, nextStep?: () => void }
) => {
    const { employeeInformations, setEmployeeInformations } = useContext(CreateEmployeeContext)
    const form = useZodForm(formSchema)
    
    const handleNextStep = async (values: SendEmployee) => {
        onChangeFormStep({ form, fields: values, setData: setEmployeeInformations })

        const result = await handleCreateEmployee(values)
        if (result) {
            toast.success("Colaborador cadastrado com sucesso!")
            redirect("/rh")
        }
    }

    console.log(employeeInformations)

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
                        <DropdownMenu
                            form={form}
                            name="department"
                            label="Departamento"
                            schemaKeys={Object.keys(formSchema.shape)}
                            options={[{ label: "Pesquisa & Desenvolvimento", value: "P&D" }, { label: "Web Design", value: "Web Design" }, { label: "Tráfego Pago", value: "Paid Traffic" }]}
                        />
                        <DropdownMenu
                            form={form} name="operation" label="Operação" schemaKeys={Object.keys(formSchema.shape)} options={[{ label: "01", value: "01" }, { label: "02", value: "02" }, { label: "03", value: "03" }]}
                        />
                        <DropdownMenu
                            form={form}
                            name="level"
                            label="Nível"
                            schemaKeys={Object.keys(formSchema.shape)}
                            options={[{ label: "Puppy", value: "Puppy" }, { label: "Auxiliar", value: "Assistant" }, { label: "Junior", value: "Junior" }]}
                        />
                    </div>
                </div>
            </RegistrationForm>
        </section>
    )
}

export default Finalization