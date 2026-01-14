"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../ui/progress"
import { formSchema } from "./formSchema"
import { Dispatch, SetStateAction, useContext } from "react"
import { CreateEmployeeContext } from "@/contexts/rh/CreateEmployeeContext"

const PersonalInformation = (
    { urlPath, prevStep, nextStep, actualStep, percentageProgress }:
    { urlPath: { name: string; route: string; }[], prevStep: () => void, nextStep: Dispatch<SetStateAction<number>>, actualStep: number, percentageProgress: number }
) => {
    const { setPersonalInformation } = useContext(CreateEmployeeContext)

    const form = useForm <z.infer <typeof formSchema>> ({
        resolver: zodResolver(formSchema),
        defaultValues: {"birthday": new Date()}
    })

    const onChangeStep = () => {
        const values = form.getValues()

        setPersonalInformation((prev) => ({
            ...prev,
            employeeName: values.name,
            birthday: values.birthday,
            civilState: values.civilState,
            nacionality: values.nacionality,
            rg: values.rg,
            cpf: values.cpf,
            email: values.email,
            motherName: values.motherName,
            phone: values.phone,
            city: values.city,
            postalCode: values.postalCode,
            street: values.street,
            neighborhood: values.neighborhood
        }))

        nextStep(2)
    }

    return (
        <section>
            <RegistrationForm formSchema={formSchema} urlPath={ urlPath } form={form} prevStep={ prevStep } nextStep={() => onChangeStep()}>
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-2xl font-bold text-default-orange">
                        { actualStep }/5 - Dados Pessoais
                    </h1>
                    <Progress value={ percentageProgress } className="max-w-107.5" />
                </div>
                <div className="flex items-stretch gap-22.5 h-155 px-38.75 py-3">
                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
                        <Field>
                            <FieldLabel htmlFor="name">
                                Nome completo
                            </FieldLabel>
                            <Input id="name" placeholder="Nome" {...form.register("name")} />
                            <FieldError>
                                {form.formState.errors.name?.message}
                            </FieldError>
                        </Field>
                        <div className="flex w-full">
                            <Field className="max-w-1/2">
                                <FieldLabel htmlFor="birthday">
                                    Data de nascimento
                                </FieldLabel>
                                <Input id="birthday" placeholder="10, Janeiro 2026" {...form.register("birthday")} onChange={(event) => setter.birthday(event.target.value)} />
                                <FieldError>
                                    {form.formState.errors.birthday?.message}
                                </FieldError>
                            </Field>
                        </div>
                        <Field className="max-w-[35%]">
                            <FieldLabel htmlFor="civilState">
                                Estado Civil
                            </FieldLabel>
                            <Select {...form.register("civilState")} onValueChange={(event) => setter.civilState(event.target.value)}>
                                <SelectTrigger id="civilState">
                                    <SelectValue placeholder="Solteiro(a)" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">
                                        Solteiro(a)
                                    </SelectItem>
                                    <SelectItem value="option2">
                                        Casado(a)
                                    </SelectItem>
                                    <SelectItem value="option3">
                                        Viúvo(a)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldError>
                                {form.formState.errors.civilState?.message}
                            </FieldError>
                        </Field>
                        <Field className="max-w-[57%]">
                            <FieldLabel htmlFor="nacionality">
                                Nacionalidade
                            </FieldLabel>
                            <Input id="nacionality" placeholder="Brasileiro" {...form.register("nacionality")} onChange={(event) => setter.naciolity(event.target.value)} />
                            <FieldError>
                                {form.formState.errors.nacionality?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="rg">
                                RG
                            </FieldLabel>
                            <Input id="rg" placeholder="1231231241" {...form.register("rg")} onChange={(event) => setter.rg(event.target.value)} />
                            <FieldError>
                                {form.formState.errors.rg?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="cpf">
                                CPF
                            </FieldLabel>
                            <Input id="cpf" placeholder="1231231241" {...form.register("cpf")} onChange={(event) => setter.cpf(event.target.value)} />
                            <FieldError>
                                {form.formState.errors.rg?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">
                                Email para contato (Pessoal)
                            </FieldLabel>
                            <Input id="email" placeholder="Email" {...form.register("email")} onChange={(event) => setter.email(event.target.value)} />
                            <FieldError>
                                {form.formState.errors.email?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="mother-name">
                                Nome completo da mãe
                            </FieldLabel>
                            <Input id="mother-name" placeholder="Nome" {...form.register("motherName")} onChange={(event) => setter.motherName(event.target.value)} />
                            <FieldError>
                                {form.formState.errors.motherName?.message}
                            </FieldError>
                        </Field>
                    </div>
                    <div>
                        <Separator orientation="vertical" className="self-stretch w-px bg-default-border-color" />
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-4.5 flex-1 h-fit">
                        <Field className="w-[48.5%]">
                            <FieldLabel htmlFor="phone">
                                Celular
                            </FieldLabel>
                            <Input id="phone" placeholder="(00) 00000-0000" {...form.register("phone")} onChange={(event) => setter.phone(event.target.value)} />
                            <FieldError>
                                {form.formState.errors.phone?.message}
                            </FieldError>
                        </Field>
                        <h1 className="w-full">
                            Endereço
                        </h1>
                        <p className="text-[#a3a3a3] text-sm">
                            Endereço atual do colaborador.
                        </p>
                        <Field className="w-[46%]">
                            <FieldLabel htmlFor="city">
                                Cidade
                            </FieldLabel>
                            <Input id="city" placeholder="Jau" {...form.register("city")} onChange={(event) => setter.city(event.target.value)} />
                            <FieldError>
                                {form.formState.errors.city?.message}
                            </FieldError>
                        </Field>
                        <Field className="w-[46%]">
                            <FieldLabel htmlFor="postalCode">
                                Código Postal
                            </FieldLabel>
                            <Input id="postalCode" placeholder="11111-111" {...form.register("postalCode")} onChange={(event) => setter.postalCode(event.target.value)} />
                            <FieldError>
                                {form.formState.errors.postalCode?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="street">
                                Rua
                            </FieldLabel>
                            <Input id="street" placeholder="Rua Lorem Ipsum" {...form.register("street")} onChange={(event) => setter.street(event.target.value)} />
                            <FieldError>
                                {form.formState.errors.street?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="neighborhood">
                                Bairro
                            </FieldLabel>
                            <Input id="neighborhood" placeholder="Bairro Lorem Ipsum" {...form.register("neighborhood")} onChange={(event) => setter.neighborhood(event.target.value)} />
                            <FieldError>
                                {form.formState.errors.neighborhood?.message}
                            </FieldError>
                        </Field>                        
                    </div>
                </div>                
            </RegistrationForm>
        </section>
    )
}

export default PersonalInformation