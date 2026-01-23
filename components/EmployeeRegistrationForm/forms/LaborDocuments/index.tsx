import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../../ui/progress"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CreateEmployeeContext } from "@/contexts/rh/CreateEmployeeContext"
import { useZodForm } from "@/hooks/useZodForm"
import { SendEmployee } from "@/types/services/rh/employee"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { onChangeFormStep } from "@/hooks/useIsValidFormField"
import DropdownMenu from "../../components/DropdownMenu"
import { formSchema } from "./formSchema"
import { Controller } from "react-hook-form"
import DatePicker from "../../components/DatePicker"
import { formatterCurrencyBRL } from "@/utils/formatters/formatterCurrencyBRL"
import { formatterBigDecimal } from "@/utils/formatters/formatterBigDecimal"

const LaborDocuments = (
    { urlPath, prevStep, actualStep, percentageProgress, nextStep }:
    { urlPath: { name: string; route: string; }[], prevStep: () => void, actualStep: number, percentageProgress: number, nextStep: Dispatch<SetStateAction<number>> }
) => {
    const { employeeInformations, setEmployeeInformations } = useContext(CreateEmployeeContext)
    
    const form = useZodForm(formSchema)
    
    const [documentationVisibility, setDocumentationVisibility] = useState<boolean>(false)
    const [date, setDate] = useState<Date | undefined>(undefined)

    const errors = form.formState.errors
    const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

    const handleNextStep = (values: SendEmployee) => {
        onChangeFormStep({ 
            form, 
            fields: { 
                ...values, 
                admissionDate: new Intl.DateTimeFormat("pt-BR").format(date), 
                salary: formatterBigDecimal(values.salary), 
                residentialProve: values.residentialProve[0].name, 
                documentation: values.documentation[0]?.name
            }, 
            setData: setEmployeeInformations, 
            nextStep 
        })
    }

    console.log(employeeInformations)

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
                        <Field>
                            <FieldLabel>
                                Carteira de Trabalho
                            </FieldLabel>
                            <Input id="workCard" maxLength={11} placeholder="12312312321" {...form.register("workCard")} />
                            <FieldError>
                                {firstErrorKey === "workCard" && String(form.formState.errors.workCard?.message)}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel>
                                PIS/PASEP
                            </FieldLabel>
                            <Input id="pisPasep" maxLength={11} placeholder="12312312321" {...form.register("pisPasep")} />
                            <FieldError>
                                {firstErrorKey === "pisPasep" && String(form.formState.errors.pisPasep?.message)}
                            </FieldError>
                        </Field>
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
                                <Input id="salary" inputMode="numeric" placeholder="R$0000,00" {...field} onChange={(event) => {
                                    const formattedValue = formatterCurrencyBRL(event.target.value)
                                    field.onChange(formattedValue)
                                }} />
                            )} />
                            <FieldError>
                                {firstErrorKey === "salary" && String(form.formState.errors.salary?.message)}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Comprovante de residencia
                            </FieldLabel>
                            <Input id="residentialProve" type="file" {...form.register("residentialProve")} />
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
                                        Resevista
                                    </Label>
                                </div>
                            </Field>
                        )} />
                        <Field className={`${!documentationVisibility && "hidden"}`}>
                            <FieldLabel>
                                Documentação
                            </FieldLabel>
                            <Input id="documentation" type="file" {...form.register("documentation")} />
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