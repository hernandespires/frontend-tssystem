"use client"

import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../../../../../components/ui/progress"
import { Dispatch, SetStateAction, useContext, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CreateEmployeeContext } from "@/contexts/rh/Employee/CreateEmployeeContext"
import { useZodForm } from "@/hooks/useZodForm"
import { Employee, SendEmployee } from "@/types/services/humanResources/employee"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { formSchema } from "./formSchema"
import { Controller } from "react-hook-form"
import { formatterCPF, formatterCurrencyBRL, formatterPisPasep, formatterBigDecimal } from "@/utils/formatters"
import { UploadContext } from "@/contexts/files/UploadContext"
import { FindEmployeeContext } from "@/contexts/rh/Employee/FindEmployeeContext"
import ActualDocument from "../components/ActualDocument"
import { FindAllEmployeesContext } from "@/contexts/rh/Employee/FindAllEmployeesContext"
import { handleConflictingValues } from "@/utils/handlers"
import dynamic from "next/dynamic"

const LaborDocuments = ({
    urlPath,
    prevStep,
    actualStep,
    percentageProgress,
    nextStep
}: {
    urlPath: { name: string; route: string }[]
    prevStep: () => void
    actualStep: number
    percentageProgress: number
    nextStep: Dispatch<SetStateAction<number>>
}) => {

    const { employeeData, setEmployeeData } = useContext(CreateEmployeeContext)
    const { employeeFound } = useContext(FindEmployeeContext)
    const { allEmployeesDataFound } = useContext(FindAllEmployeesContext)
    const { uploadData } = useContext(UploadContext)

    const form = useZodForm(formSchema)

    const errors = form.formState.errors
    const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

    const DatePicker = dynamic(() => import("../components/DatePicker"), { ssr: false })
    const DropdownMenu = dynamic(() => import("../components/DropdownMenu"), { ssr: false })

    const watchedDocumentation = form.watch("documentation")
    const watchedResidential = form.watch("residentialProve")
    const watchedReservist = form.watch("reservist")

const getDocumentName = (value: any) => {
    if (!value) return undefined

    if (value instanceof FileList && value.length > 0) {
        return value[0].name
    }

    if (typeof value === "string") {
        return value
    }

    return undefined
}

useEffect(() => {
    if (employeeFound?.documentation && employeeFound.documentation.length > 0) {
        form.reset({
            ...form.getValues(),
            reservist: true
        })
    }
}, [employeeFound?.documentation])


    useEffect(() => {
        if (uploadData.residentialProve)
            form.setValue("residentialProve", uploadData.residentialProve)
    }, [uploadData.residentialProve])

    useEffect(() => {
        if (uploadData.documentation)
            form.setValue("documentation", uploadData.documentation)
    }, [uploadData.documentation])

    useEffect(() => {
        if (employeeData?.documentation)
            form.setValue("documentation", employeeData.documentation)

        if (employeeData?.residentialProve)
            form.setValue("residentialProve", employeeData.residentialProve)
    }, [])

    // limpa documentação quando não for reservista
    useEffect(() => {
        if (!watchedReservist) {
            form.setValue("documentation", null)
            setEmployeeData((prev: Employee) => ({ ...prev, documentation: null }))
        }
    }, [watchedReservist])

    const handleNextStep = (values: SendEmployee) => {

        const conflictFieldMessages: Record<keyof Employee, string> = {
            workCard: "Carteira de trabalho",
            pisPasep: "PIS/PASEP"
        }

        if (
            ["workCard", "pisPasep"].some(field =>
                handleConflictingValues(
                    employeeFound,
                    allEmployeesDataFound,
                    field as keyof Employee,
                    values[field],
                    conflictFieldMessages
                )
            )
        ) return

        const admissionISO =
            values.admissionDate instanceof Date
                ? values.admissionDate.toISOString()
                : values.admissionDate
                    ? new Date(values.admissionDate).toISOString()
                    : undefined

        useIsValidFormField({
            form,
            fields: {
                ...values,

                admissionDate: admissionISO,

                salary:
                    formatterBigDecimal(values.salary),

                residentialProve:
                    getDocumentName(values.residentialProve) ??
                    employeeData?.residentialProve ??
                    employeeFound?.residentialProve,

                documentation:
                    getDocumentName(values.documentation) ??
                    employeeData?.documentation ??
                    employeeFound?.documentation
            },

            setData: setEmployeeData,
            nextStep
        })
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
                        {actualStep}/5 - Documentação Trabalhista
                    </h1>
                    <Progress value={percentageProgress} className="max-w-107.5" />
                </div>

                <div className="flex items-stretch gap-22.5 max-h-132 px-38.75 py-3 justify-center">
                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
                        <Controller
                            name="workCard"
                            control={form.control}
                            defaultValue=""
                            render={({ field }) => (
                                <Field>
                                    <FieldLabel>
                                        Carteira de Trabalho
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        maxLength={14}
                                        placeholder="XXX.XXX.XXX-XX"
                                        onChange={(e) =>
                                            field.onChange(formatterCPF(e.target.value))
                                        }
                                    />
                                    <FieldError>
                                        {firstErrorKey === "workCard" &&
                                            String(form.formState.errors.workCard?.message)}
                                    </FieldError>
                                </Field>
                            )}
                        />

                        <Controller
                            name="pisPasep"
                            control={form.control}
                            defaultValue=""
                            render={({ field }) => (
                                <Field>
                                    <FieldLabel>
                                        PIS/PASEP
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        maxLength={14}
                                        placeholder="XXX.XXXXX.XX-X"
                                        onChange={(event) =>
                                            field.onChange(
                                                formatterPisPasep(event.target.value)
                                            )
                                        }
                                    />
                                    <FieldError>
                                        {firstErrorKey === "pisPasep" &&
                                            String(form.formState.errors.pisPasep?.message)}
                                    </FieldError>
                                </Field>
                            )}
                        />

                        <DropdownMenu
                            form={form}
                            name="typeEmployment"
                            label="Tipo de Vínculo"
                            schemaKeys={Object.keys(formSchema.shape)}
                            options={[
                                { label: "CLT", value: "CLT" },
                                { label: "CNPJ", value: "CNPJ" },
                                { label: "Freelance", value: "FREELANCE" }
                            ]}
                        />

                        <DropdownMenu
                            className="max-w-[68%]"
                            form={form}
                            name="laborModality"
                            label="Modalidade"
                            schemaKeys={Object.keys(formSchema.shape)}
                            options={[
                                { label: "Presencial", value: "IN_PERSON" },
                                { label: "Semi-presencial", value: "HYBRID" },
                                { label: "Home office", value: "HOME_OFFICE" }
                            ]}
                        />

                        <DropdownMenu
                            form={form}
                            name="laborScale"
                            label="Escala"
                            schemaKeys={Object.keys(formSchema.shape)}
                            options={[
                                { label: "5x2", value: "_5X2" },
                                { label: "4x3", value: "_4X3" },
                                { label: "6x1", value: "_6X1" }
                            ]}
                        />
                    </div>

                    <div>
                        <Separator orientation="vertical" />
                    </div>

                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
                        <div className="w-full">
                            <DatePicker
                                form={form}
                                formSchema={formSchema}
                                fieldName="admissionDate"
                                label="Data de admisão"
                                className="max-w-1/2"
                            />
                        </div>

                        <Field>
                            <FieldLabel>
                                Salário
                            </FieldLabel>
                            <Controller
                                name="salary"
                                control={form.control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        inputMode="numeric"
                                        maxLength={13}
                                        placeholder="R$ 0000,00"
                                        onChange={(event) =>
                                            field.onChange(
                                                formatterCurrencyBRL(event.target.value)
                                            )
                                        }
                                    />
                                )}
                            />
                            <FieldError>
                                {firstErrorKey === "salary" &&
                                    String(form.formState.errors.salary?.message)}
                            </FieldError>
                        </Field>

                        <Field>
                            <FieldLabel>
                                Comprovante de residência
                            </FieldLabel>
                            <ActualDocument>
                                {getDocumentName(watchedResidential) ??
                                    employeeFound?.residentialProve ??
                                    employeeData?.residentialProve ??
                                    ""}
                            </ActualDocument>
                            <Input
                                type="file"
                                accept=".pdf,.png,.docx,.jpg"
                                {...form.register("residentialProve")}
                            />
                        </Field>

                        <Controller
                            name="reservist"
                            control={form.control}
                            render={({ field }) => (
                                <Field>
                                    <div className="flex gap-2">
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(checked) =>
                                                field.onChange(checked)
                                            }
                                        />
                                        <Label>
                                            Reservista
                                        </Label>
                                    </div>
                                </Field>
                            )}
                        />

                        <Field className={!watchedReservist ? "hidden" : ""}>
                            <FieldLabel>
                                Documentação
                            </FieldLabel>
                            <ActualDocument>
                                {getDocumentName(watchedDocumentation) ??
                                    employeeFound?.documentation ??
                                    employeeData?.documentation ??
                                    ""}
                            </ActualDocument>
                            <Input
                                type="file"
                                accept=".pdf,.png,.docx,.jpg"
                                {...form.register("documentation")}
                            />
                        </Field>
                    </div>
                </div>
            </RegistrationForm>
        </section>
    )
}

export default LaborDocuments