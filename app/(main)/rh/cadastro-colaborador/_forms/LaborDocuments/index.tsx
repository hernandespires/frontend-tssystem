import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../../../../../components/ui/progress"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CreateEmployeeContext } from "@/contexts/rh/Employee/CreateEmployeeContext"
import { useZodForm } from "@/hooks/useZodForm"
import { Employee, SendEmployee } from "@/types/services/humanResources/employee"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { formSchema } from "./formSchema"
import { Controller } from "react-hook-form"
import { formatterCPF, formatterCurrencyBRL, formatterPisPasep } from "@/utils/formatters"
import { formatterBigDecimal } from "@/utils/formatters"
import { UploadContext } from "@/contexts/files/UploadContext"
import { FindEmployeeContext } from "@/contexts/rh/Employee/FindEmployeeContext"
import ActualDocument from "../components/ActualDocument"
import { FindAllEmployeesContext } from "@/contexts/rh/Employee/FindAllEmployeesContext"
import { handleConflictingValues } from "@/utils/handlers"
import dynamic from "next/dynamic"

const LaborDocuments = (
    { urlPath, prevStep, actualStep, percentageProgress, nextStep }:
    { urlPath: { name: string; route: string; }[], prevStep: () => void, actualStep: number, percentageProgress: number, nextStep: Dispatch<SetStateAction<number>> }
) => {
    const { employeeData, setEmployeeData } = useContext(CreateEmployeeContext)
    const { setFiles } = useContext(UploadContext)
    const { employeeFound } = useContext(FindEmployeeContext)
    const { allEmployeesDataFound } = useContext(FindAllEmployeesContext)
    
    const form = useZodForm(formSchema)    
    
    const [documentationVisibility, setDocumentationVisibility] = useState<boolean>(false)
    const [date, setDate] = useState<Date | undefined>(undefined)

    const errors = form.formState.errors
    const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

    useEffect(() => {
        if (employeeFound.reservist) setDocumentationVisibility(employeeFound.reservist)
        else if (employeeData.reservist) setDocumentationVisibility(employeeData.reservist)
    }, [])

    const handleNextStep = (values: SendEmployee) => {
        const conflictFieldMessages: Record<keyof Employee, string> = { workCard: "Carteira de trabalho", pisPasep: "PIS/PASEP" }
        
        if (["workCard", "pisPasep"].some((field) => handleConflictingValues(employeeFound, allEmployeesDataFound, field as keyof Employee, values[field], conflictFieldMessages))) return

        // if (["workCard", "pisPasep"].some((field) => handleConflictingValues(employeeFound, values[field], field, allEmployeesDataFound))) return

        useIsValidFormField({
            form, 
            fields: { 
                ...values,
                admissionDate: new Intl.DateTimeFormat("pt-BR").format(new Date(values.admissionDate)),
                salary: formatterBigDecimal(values.salary),
                residentialProve: values.residentialProve.length > 0 && values.residentialProve[0].name,
                documentation: values.documentation[0]?.name
            },
            setData: setEmployeeData,
            nextStep
        })        
        
        setFiles(([...values.residentialProve, ...values.documentation]))
    }    

    const DatePicker = dynamic(() => import("../components/DatePicker"), { ssr: false })
    const DropdownMenu = dynamic(() => import("../components/DropdownMenu"), { ssr: false })

    return (
        <section>
            <RegistrationForm formSchema={formSchema} urlPath={ urlPath } form={form} prevStep={ prevStep } nextStep={handleNextStep}>
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-2xl font-bold text-default-orange">
                        { actualStep }/5 - Documentação Trabalhista
                    </h1>
                    <Progress value={ percentageProgress } className="max-w-107.5" />
                </div>
                <div className="flex items-stretch gap-22.5 h-112 px-38.75 py-3">
                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
                        <Controller name="workCard" control={form.control} defaultValue="" render={({ field }) => (
                            <Field>
                                <FieldLabel>
                                    Carteira de Trabalho
                                </FieldLabel>
                                <Input id="workCard" maxLength={14} placeholder="XXX.XXX.XXX-XX" {...field} onChange={(event) => {
                                    field.onChange(formatterCPF(event.target.value))
                                }} />
                                <FieldError>
                                    {firstErrorKey === "workCard" && String(form.formState.errors.workCard?.message)}
                                </FieldError>
                            </Field>
                        )} />
                        <Controller name="pisPasep" control={form.control} defaultValue="" render={({ field }) => (
                            <Field>
                                <FieldLabel>
                                    PIS/PASEP
                                </FieldLabel>
                                <Input id="pisPasep" maxLength={14} placeholder="XXX.XXXXX.XX-X" {...field} onChange={(event) => {
                                    field.onChange(formatterPisPasep(event.target.value))
                                }} />
                                <FieldError>
                                    {firstErrorKey === "pisPasep" && String(form.formState.errors.pisPasep?.message)}
                                </FieldError>
                            </Field>
                        )} />
                        <DropdownMenu form={form} name="typeEmployment" label="Tipo de Vínculo" schemaKeys={Object.keys(formSchema.shape)} options={[
                            { label: "CLT", value: "CLT" }, { label: "CNPJ", value: "CNPJ" }, { label: "Freelance", value: "FREELANCE" }
                        ]} />
                        <DropdownMenu className="max-w-[68%]" form={form} name="laborModality" label="Modalidade" schemaKeys={Object.keys(formSchema.shape)} options={[
                            { label: "Presencial", value: "IN_PERSON" }, { label: "Semi-presencial", value: "HYBRID" }, { label: "Home office", value: "HOME_OFFICE" }
                        ]} />
                        <DropdownMenu form={form} name="laborScale" label="Escala" schemaKeys={Object.keys(formSchema.shape)} options={[
                            { label: "5x2", value: "_5X2" }, { label: "4x3", value: "_4X3" }, { label: "6x1", value: "_6X1" }
                        ]} />
                    </div>
                    <div>
                        <Separator orientation="vertical" className="self-stretch w-px bg-default-border-color" />
                    </div>
                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
                        <div className="w-full">
                            <DatePicker form={form} formSchema={formSchema} fieldName="admissionDate" label="Data de admisão" className="max-w-1/2" />                            
                        </div>
                        <Field>
                            <FieldLabel>
                                Salário
                            </FieldLabel>
                            <Controller control={form.control} name="salary" defaultValue="" render={({ field }) => (
                                <Input id="salary" inputMode="numeric" maxLength={13} placeholder="R$ 0000,00" {...field} onChange={(event) => {
                                    field.onChange(formatterCurrencyBRL(event.target.value))
                                }} />
                            )} />
                            <FieldError>
                                {firstErrorKey === "salary" && String(form.formState.errors.salary?.message)}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Comprovante de residência
                            </FieldLabel>
                            <ActualDocument>
                                {employeeFound?.residentialProve ? employeeFound?.residentialProve : employeeData?.residentialProve}
                            </ActualDocument>
                            <Input id="residentialProve" type="file" accept=".pdf, .png, .docx, .jpg" {...form.register("residentialProve")} />
                            <FieldError>
                                {firstErrorKey === "residentialProve" && String(form.formState.errors.residentialProve?.message)}
                            </FieldError>
                        </Field>
                        <Controller name="reservist" control={form.control} defaultValue={false} render={({ field }) => (
                            <Field>
                                <div className="flex gap-2">
                                    <Checkbox id="reservist" checked={field.value} onCheckedChange={(isChecked) => {                                    
                                        setDocumentationVisibility(Boolean(isChecked))
                                        field.onChange(isChecked)
                                    }} />
                                    <Label htmlFor="reservist">
                                        Reservista
                                    </Label>
                                </div>
                            </Field>
                        )} />
                        <Field className={`${!documentationVisibility && "hidden"}`}>
                            <FieldLabel>
                                Documentação
                            </FieldLabel>
                            <ActualDocument>
                                {employeeFound?.documentation ? employeeFound?.documentation : employeeData?.documentation}
                            </ActualDocument>
                            <Input id="documentation" type="file" accept=".pdf, .png, .docx, .jpg" {...form.register("documentation")} />
                            <FieldError>
                                {firstErrorKey === "documentation" && String(form.formState.errors.documentation?.message)}
                            </FieldError>
                        </Field>
                    </div>
                </div>
            </RegistrationForm>
        </section>
    )
}

export default LaborDocuments