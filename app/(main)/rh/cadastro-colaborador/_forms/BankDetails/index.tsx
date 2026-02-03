"use client"

import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../../../../../components/ui/progress"
import { formSchema } from "./formSchema"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CreateEmployeeContext } from "@/contexts/rh/Employee/CreateEmployeeContext"
import { useZodForm } from "@/hooks/useZodForm"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { SendEmployee } from "@/types/services/humanResources/employee"
import { Controller } from "react-hook-form"
import { formatterBankAgencyAndAccount, formatterCNPJ, formatterCurrencyBRL, formatterPix } from "@/utils/formatters"
import { formatterBigDecimal } from "@/utils/formatters"
import DropdownMenu from "../components/DropdownMenu"
import { FindEmployeeContext } from "@/contexts/rh/Employee/FindEmployeeContext"

const BankDetails = (
    { urlPath, prevStep, actualStep, percentageProgress, nextStep }: 
    { urlPath: { name: string; route: string; }[], prevStep: () => void, actualStep: number, percentageProgress: number, nextStep: Dispatch<SetStateAction<number>> }
) => {
    const { setEmployeeData } = useContext(CreateEmployeeContext)
    const { employeeFound } = useContext(FindEmployeeContext)

    const [transportationVoucherDocumentationVisibility, setTransportationVoucherDocumentationVisibility] = useState<boolean>(
        employeeFound.transportationVoucher !== undefined || null ? employeeFound.transportationVoucher : false
    )
    
    const form = useZodForm(formSchema)
    
    const errors = form.formState.errors
    const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))
    
    const handleNextStep = (values: SendEmployee) => {
        useIsValidFormField({ form, fields: { ...values, monthlyAmount: formatterBigDecimal(values.monthlyAmount) }, setData: setEmployeeData, nextStep })
    }

    return (
        <section>
            <RegistrationForm formSchema={formSchema} urlPath={ urlPath } form={form} prevStep={ prevStep } nextStep={handleNextStep}>
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-2xl font-bold text-default-orange">
                        { actualStep }/5 - Dados Pessoais
                    </h1>
                    <Progress value={ percentageProgress } className="max-w-107.5" />
                </div>
                <div className="flex items-stretch gap-22.5 h-112 px-38.75 py-3">
                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
                        <DropdownMenu form={form} name="bank" label="Banco" schemaKeys={Object.keys(formSchema.shape)} options={[
                            { label: "Santander", value: "SANTANDER" }, { label: "Sicred", value: "SICRED" }, { label: "Banco do Brasil", value: "BANCO_DO_BRASIL" }
                        ]} />
                        <Controller name="agency" control={form.control} defaultValue="" render={({ field }) => (
                            <Field>
                                <FieldLabel htmlFor="agency">
                                    Agência
                                </FieldLabel>
                                <Input id="agency" maxLength={6} placeholder="XXXX-X" {...field} onChange={(event) => {
                                    field.onChange(formatterBankAgencyAndAccount(event.target.value))
                                }} />
                                <FieldError>
                                    {firstErrorKey === "agency" && String(form.formState.errors.agency?.message)}
                                </FieldError>
                            </Field>
                        )} />
                        <Controller name="account" control={form.control} defaultValue="" render={({ field }) => (
                            <Field>
                                <FieldLabel htmlFor="account">
                                    Conta
                                </FieldLabel>
                                <Input id="account" maxLength={6} placeholder="XXXX-X" {...field} onChange={(event) => {
                                    field.onChange(formatterBankAgencyAndAccount(event.target.value))
                                }} />
                                <FieldError>
                                    {firstErrorKey === "account" && String(form.formState.errors.account?.message)}
                                </FieldError>
                            </Field>
                        )} />
                        <Controller name="pix" control={form.control} defaultValue="" render={({ field }) => (
                            <Field>
                                <FieldLabel htmlFor="pix">
                                    Chave Pix
                                </FieldLabel>
                                <Input id="pix" maxLength={155} placeholder="email / documento / celular" {...field} onChange={(event) => {
                                    field.onChange(formatterPix(event.target.value))
                                }} />
                                <FieldError>
                                    {firstErrorKey === "pix" && String(form.formState.errors.pix?.message)}
                                </FieldError>
                            </Field>
                        )} />
                    </div>
                    <div>
                        <Separator orientation="vertical" className="self-stretch w-px bg-default-border-color" />
                    </div>
                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
                        <Controller name="transportationVoucher" control={form.control} defaultValue={false} render={({ field }) => (
                            <Field>
                                <div className="flex gap-2">
                                    <Checkbox id="transportationVoucher" checked={field.value} onCheckedChange={(isChecked) => {
                                        setTransportationVoucherDocumentationVisibility(Boolean(isChecked))
                                        field.onChange(isChecked)
                                    }}
                                    />
                                    <Label htmlFor="transportationVoucher">
                                        Vale Transporte
                                    </Label>
                                </div>
                            </Field>
                        )} />
                        <Controller name="cnpjTransportationVoucher" control={form.control} defaultValue={false} render={({ field }) => (
                            <Field className={transportationVoucherDocumentationVisibility ? "flex" : "hidden"}>
                                <FieldLabel htmlFor="cnpjTransportationVoucher">
                                    CNPJ - Empresa vale transporte
                                </FieldLabel>
                                <Input 
                                    id="cnpjTransportationVoucher" inputMode="numeric" maxLength={18} placeholder="XX.XXX.XXX/XXXX-XX" {...field} onChange={(event) => {
                                        field.onChange(formatterCNPJ(event.target.value))
                                    }} 
                                />
                                <FieldError>
                                    {firstErrorKey === "cnpjTransportationVoucher" && String(form.formState.errors.cnpjTransportationVoucher?.message)}
                                </FieldError>
                            </Field>
                        )} />
                        <Field className={transportationVoucherDocumentationVisibility ? "flex" : "hidden"}>
                            <FieldLabel htmlFor="monthlyAmount">
                                Valor mensal
                            </FieldLabel>
                            <Controller control={form.control} name="monthlyAmount" defaultValue="" render={({ field }) => (
                                <Input id="monthlyAmount" inputMode="numeric" maxLength={13} placeholder="R$ 0000,00" {...field} onChange={(event) => {
                                    field.onChange(formatterCurrencyBRL(event.target.value))
                                }} />
                            )} />
                            <FieldError>
                                {firstErrorKey === "monthlyAmount" && String(form.formState.errors.monthlyAmount?.message)}
                            </FieldError>
                        </Field>
                    </div>
                </div>                
            </RegistrationForm>
        </section>
    )
}

export default BankDetails