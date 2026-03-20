"use client"

import RegistrationForm from "@/components/RegistrationForm"
import { formSchema } from "./formSchema"
import { useEmployeeFormStore } from "@/store/rh/employee/useEmployeeFormStore"
import { useUploadStore } from "@/store/files/useUploadStore"
import { useZodForm } from "@/hooks/useZodForm"
import { SendEmployee } from "@/types/services/humanResources/employee"
import { toast } from "sonner"
import { createEmployee } from "@/services/humanResources/employee"
import { multipleUpload } from "@/services/file/upload"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import StepProgressBar from "@/components/StepProgressBar"
import { FormType } from "@/types/form"
import { FieldValues } from "react-hook-form"

const DropdownMenu = dynamic(() => import("../../../../../../../components/Form/DropdownMenu"), { ssr: false })

const Finalization = ({ urlPath, prevStep, actualStep, percentageProgress }: FormType) => {
	const { employeeData, setEmployeeData, resetEmployeeData } = useEmployeeFormStore()
	const { uploadData, clearUploads } = useUploadStore()
	const form = useZodForm(formSchema, "rh")
	const router = useRouter()

	const HIDDEN_DEPARTMENTS = ["FINANCE", "HUMAN_RESOURCES", "MARKETING", "RESEARCH_AND_DEVELOPMENT", "SALES"]

	const department = form.watch("department")
	const shouldHideOperation = HIDDEN_DEPARTMENTS.includes(department as string)

	const handleCreateEmployee = async (values: SendEmployee) => {
		try {
			const allFiles: File[] = Object.values(uploadData ?? {}).flat() as File[]

			let uploadedNames: string[] = []

			if (allFiles.length) {
				const result = await multipleUpload(allFiles)
				uploadedNames = result?.map((f: { name: string }) => f.name) ?? []
			}

			const merged = { ...employeeData, ...values, additionalDocuments: uploadedNames }

			const payload = { ...merged } as Record<string, unknown>
			delete payload.id

			setEmployeeData(payload as unknown as Partial<SendEmployee>)

			const created = await createEmployee(payload as unknown as SendEmployee)

			return !!created
		} catch (err) {
			console.error(err)
			return false
		}
	}

	const handleNextStep = async (values: FieldValues) => {
		const ok = await handleCreateEmployee(values as SendEmployee)

		if (ok) {
			toast.success("Colaborador cadastrado com sucesso!")
			resetEmployeeData()
			clearUploads()
			router.push("/rh")
		} else {
			toast.error("Erro ao cadastrar colaborador")
		}
	}

	return (
		<RegistrationForm formSchema={formSchema} urlPath={urlPath} form={form} prevStep={prevStep} nextStep={handleNextStep}>
			<StepProgressBar actualStep={actualStep} percentageProgress={percentageProgress} />
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
	)
}

export default Finalization
