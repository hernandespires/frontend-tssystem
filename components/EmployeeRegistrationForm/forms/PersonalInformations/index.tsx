import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../../ui/progress"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { CreateEmployeeContext } from "@/contexts/rh/CreateEmployeeContext"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useZodForm } from "@/hooks/useZodForm"
import { onChangeFormStep } from "@/hooks/useIsValidFormField"
import { SendPersonalInformation } from "@/types/services/rh/employee"
import DropdownMenu from "../../components/DropdownMenu"
import { formSchema } from "./formSchema"

const PersonalInformation = (
    { urlPath, prevStep, nextStep, actualStep, percentageProgress }:
    { urlPath: { name: string; route: string; }[], prevStep: () => void, nextStep: Dispatch<SetStateAction<number>>, actualStep: number, percentageProgress: number }
) => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)
    const { setPersonalInformation } = useContext(CreateEmployeeContext)

    const form = useZodForm(formSchema)

    const errors = form.formState.errors
    const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

    const handleNextStep = (values: SendPersonalInformation) => {
        onChangeFormStep({ form, fields: values, setData: setPersonalInformation, nextStep })
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
                <div className="flex items-stretch gap-22.5 h-155 px-38.75 py-3 relative">
                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
                        <Field>
                            <FieldLabel htmlFor="name">
                                Nome completo
                            </FieldLabel>
                            <Input id="name" placeholder="Nome" {...form.register("name")} />
                            <FieldError>
                                {firstErrorKey === "name" && String(form.formState.errors.name?.message)}
                            </FieldError>
                        </Field>
                        <div className="w-full">
                            <Field className="max-w-1/2">
                                <FieldLabel htmlFor="birthday">
                                    Data de nascimento
                                </FieldLabel>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" id="date" className="justify-between font-normal">
                                            {date ? date.toLocaleDateString() : "Select date"}
                                            <ChevronDownIcon />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            captionLayout="dropdown"
                                            onSelect={(date) => {
                                                setDate(date)
                                                setOpen(false)
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FieldError>
                                    {firstErrorKey === "birthday" && String(form.formState.errors.birthday?.message)}
                                </FieldError>
                            </Field>
                        </div>
                        <DropdownMenu
                            className="max-w-[35%]"
                            form={form}
                            name="civilState"
                            label="Estado Civil"
                            schemaKeys={Object.keys(formSchema.shape)}
                            options={[{ label: "Solteiro(a)", value: "single" }, { label: "Casado(a)", value: "married" }, { label: "Viúvo(a)", value: "widowed" }]}
                        />
                        <DropdownMenu
                            className="max-w-[57%]"
                            form={form}
                            name="nacionality"
                            label="Nacionalidade"
                            schemaKeys={Object.keys(formSchema.shape)}
                            options={[{ label: "Brasileiro(a)", value: "brazilian" }, { label: "Americano(a)", value: "american" }, { label: "Outro(a)", value: "other" }]}
                        />
                        <Field>
                            <FieldLabel htmlFor="rg">
                                RG
                            </FieldLabel>
                            <Input id="rg" placeholder="1231231241" {...form.register("rg")} />
                            <FieldError>
                                {firstErrorKey === "rg" && String(form.formState.errors.rg?.message)}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="cpf">
                                CPF
                            </FieldLabel>
                            <Input id="cpf" placeholder="1231231241" {...form.register("cpf")} />
                            <FieldError>
                                {firstErrorKey === "cpf" && String(form.formState.errors.cpf?.message)}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">
                                Email para contato (Pessoal)
                            </FieldLabel>
                            <Input id="email" placeholder="Email" {...form.register("email")} />
                            <FieldError>
                                {firstErrorKey === "email" && String(form.formState.errors.email?.message)}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="mother-name">
                                Nome completo da mãe
                            </FieldLabel>
                            <Input id="mother-name" placeholder="Nome" {...form.register("motherName")} />
                            <FieldError>
                                {firstErrorKey === "motherName" && String(form.formState.errors.motherName?.message)}
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
                            <Input id="phone" placeholder="(00) 00000-0000" {...form.register("phone")} />
                            <FieldError>
                                {firstErrorKey === "phone" && String(form.formState.errors.phone?.message)}
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
                            <Input id="city" placeholder="Jau" {...form.register("city")} />
                            <FieldError>
                                {firstErrorKey === "city" && String(form.formState.errors.city?.message)}
                            </FieldError>
                        </Field>
                        <Field className="w-[46%]">
                            <FieldLabel htmlFor="postalCode">
                                Código Postal
                            </FieldLabel>
                            <Input id="postalCode" placeholder="11111-111" {...form.register("postalCode")} />
                            <FieldError>
                                {firstErrorKey === "postalCode" && String(form.formState.errors.postalCode?.message)}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="street">
                                Rua
                            </FieldLabel>
                            <Input id="street" placeholder="Rua Lorem Ipsum" {...form.register("street")} />
                            <FieldError>
                                {firstErrorKey === "street" && String(form.formState.errors.street?.message)}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="neighborhood">
                                Bairro
                            </FieldLabel>
                            <Input id="neighborhood" placeholder="Bairro Lorem Ipsum" {...form.register("neighborhood")} />
                            <FieldError>
                                {firstErrorKey === "neighborhood" && String(form.formState.errors.neighborhood?.message)}
                            </FieldError>
                        </Field>
                    </div>
                </div>
            </RegistrationForm>
        </section>
    )
}

export default PersonalInformation