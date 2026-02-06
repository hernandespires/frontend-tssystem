"use client"

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
import {
    formatterCPF,
    formatterCurrencyBRL,
    formatterPisPasep,
    formatterBigDecimal
} from "@/utils/formatters"
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

    const [documentationVisibility, setDocumentationVisibility] = useState(false)

    const errors = form.formState.errors
    const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

    const DatePicker = dynamic(() => import("../components/DatePicker"), { ssr: false })
    const DropdownMenu = dynamic(() => import("../components/DropdownMenu"), { ssr: false })

    // Watch reativo
    const watchedDocumentation = form.watch("documentation")
    const watchedResidential = form.watch("residentialProve")

    // 🔹 Função para extrair nome do documento
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

    // Mostrar campo documentação se já marcado antes
    useEffect(() => {
        setDocumentationVisibility(
            employeeData?.reservist ??
            employeeFound?.reservist ??
            false
        )
    }, [])

    // Restore uploads vindos do UploadContext
    useEffect(() => {
        if (uploadData.residentialProve)
            form.setValue("residentialProve", uploadData.residentialProve)
    }, [uploadData.residentialProve])

    useEffect(() => {
        if (uploadData.documentation)
            form.setValue("documentation", uploadData.documentation)
    }, [uploadData.documentation])

    // Restore dados do contexto ao voltar de step
    useEffect(() => {
        if (employeeData?.documentation)
            form.setValue("documentation", employeeData.documentation)

        if (employeeData?.residentialProve)
            form.setValue("residentialProve", employeeData.residentialProve)
    }, [])

    // ================= SUBMIT =================

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

        useIsValidFormField({
            form,
            fields: {
                ...values,

                admissionDate:
                    new Date(values.admissionDate).toLocaleDateString("pt-BR"),

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

                <div className="flex items-stretch gap-22.5 h-112 px-38.75 py-3">

                    {/* ESQUERDA */}
                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">

                        <Controller
                            name="workCard"
                            control={form.control}
                            defaultValue=""
                            render={({ field }) => (
                                <Field>
                                    <FieldLabel>Carteira de Trabalho</FieldLabel>

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
                                    <FieldLabel>PIS/PASEP</FieldLabel>

                                    <Input
                                        {...field}
                                        maxLength={14}
                                        placeholder="XXX.XXXXX.XX-X"
                                        onChange={(e) =>
                                            field.onChange(formatterPisPasep(e.target.value))
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

                    <Separator orientation="vertical" />

                    {/* DIREITA */}
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
                            <FieldLabel>Salário</FieldLabel>

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
                                        onChange={(e) =>
                                            field.onChange(
                                                formatterCurrencyBRL(e.target.value)
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

                        {/* COMPROVANTE */}
                        <Field>
                            <FieldLabel>Comprovante de residência</FieldLabel>

                            <ActualDocument>
                                {
                                    getDocumentName(watchedResidential) ??
                                    employeeData?.residentialProve ??
                                    employeeFound?.residentialProve ??
                                    ""
                                }
                            </ActualDocument>

                            <Input
                                type="file"
                                accept=".pdf,.png,.docx,.jpg"
                                {...form.register("residentialProve")}
                            />
                        </Field>

                        {/* RESERVISTA */}
                        <Controller
                            name="reservist"
                            control={form.control}
                            defaultValue={false}
                            render={({ field }) => (
                                <Field>
                                    <div className="flex gap-2">
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(v) => {
                                                setDocumentationVisibility(Boolean(v))
                                                field.onChange(v)
                                            }}
                                        />
                                        <Label>Reservista</Label>
                                    </div>
                                </Field>
                            )}
                        />

                        {/* DOCUMENTAÇÃO */}
                        <Field className={!documentationVisibility ? "hidden" : ""}>
                            <FieldLabel>Documentação</FieldLabel>

                            <ActualDocument>
                                {
                                    getDocumentName(watchedDocumentation) ??
                                    employeeData?.documentation ??
                                    employeeFound?.documentation ??
                                    ""
                                }
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